const dotenv = require("dotenv");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

dotenv.config({ path: "../.env" });

/* -------------------- DB CONNECTION -------------------- */
const db = mysql.createPool({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db,
  waitForConnections: true,
  connectionLimit: 10,
});

/* -------------------- QUERY WRAPPER -------------------- */
async function dbQuery(sql, params = []) {
  const [rows] = await db.query(sql, params);
  return rows;
}

/* -------------------- SAFE HELPERS -------------------- */
function toSafeNumber(value) {
  const n = Number(value);
  return isNaN(n) ? 0 : n;
}

function toSafeString(value) {
  return value == null ? "" : String(value).trim();
}

/* -------------------- BUSINESS HELPERS -------------------- */

/* FACTURES */
function fc_ttc_vente(f) {
  return f.Type === "Facture de vente" ? toSafeNumber(f.TotalTTC) : 0;
}

function fc_ht_vente(f) {
  return f.Type === "Facture de vente" ? toSafeNumber(f.TotalHT) : 0;
}

function fc_total_fodec(f) {
  return f.Type === "Facture de vente" ? toSafeNumber(f.MTFODEC) : 0;
}

function fc_total_mtdc(f) {
  return f.Type === "Facture de vente" ? toSafeNumber(f.MTDC) : 0;
}

function fc_tva_vente(f) {
  const base =
    fc_ht_vente(f) + fc_total_fodec(f) + fc_total_mtdc(f);

  return (base * toSafeNumber(f.tva)) / 100;
}

function fc_ht_achat(f) {
  return f.Type === "Facture d'achat" ? toSafeNumber(f.TotalHT) : 0;
}

function fc_tva_achat(f) {
  if (f.Type !== "Facture d'achat") return 0;

  const base =
    toSafeNumber(f.TotalHT) +
    toSafeNumber(f.MTFODEC) +
    toSafeNumber(f.MTDC);

  return (base * toSafeNumber(f.tva)) / 100;
}

/* RETENUE 1000 RULE */
function fc_retenue_1000(f) {
  const ttc = toSafeNumber(f.TotalTTC);
  return f.Type === "Facture d'achat" && ttc > 1000 ? ttc * 0.1 : 0;
}

function fc_retenue(r) {
  return toSafeNumber(r.montantTTC) * 0.15;
}

function fc_tva_r(r) {
  return toSafeNumber(r.montantTTC) - toSafeNumber(r.montantHT);
}

/* -------------------- PAIE LOGIC -------------------- */

function calculateNetSocialAnnuel(p) {
  const CNSS = 0.0968;
  return (toSafeNumber(p.salaireBrut) * (1 - CNSS)) * 12;
}

function FondProfessionel(p) {
  const val = calculateNetSocialAnnuel(p) * 0.1;
  return Math.min(val, 2000);
}

function NetFP(p) {
  return calculateNetSocialAnnuel(p) - FondProfessionel(p);
}

function Abattement(p) {
  if (p.chef !== "Oui") return 0;

  const enfants = toSafeNumber(p.enfants);

  if (enfants === 0) return 300;
  if (enfants === 1) return 400;
  if (enfants === 2) return 500;
  if (enfants === 3) return 600;
  return 700;
}

function Imposable(p) {
  return NetFP(p) - Abattement(p);
}

function IRPP(p) {
  const S = Imposable(p);
  let irpp = 0;

  if (S <= 5000) irpp = 0;
  else if (S <= 10000) irpp = (S - 5000) * 0.15;
  else if (S <= 20000) irpp = 5000 * 0.15 + (S - 10000) * 0.25;
  else if (S <= 30000) irpp = 5000 * 0.15 + 10000 * 0.25 + (S - 20000) * 0.3;
  else if (S <= 40000) irpp = 5000 * 0.15 + 10000 * 0.25 + 10000 * 0.3 + (S - 30000) * 0.33;
  else if (S <= 50000) irpp = 5000 * 0.15 + 10000 * 0.25 + 10000 * 0.3 + 10000 * 0.33 + (S - 40000) * 0.36;
  else if (S <= 70000) irpp = 5000 * 0.15 + 10000 * 0.25 + 10000 * 0.3 + 10000 * 0.33 + 10000 * 0.36 + (S - 50000) * 0.38;
  else irpp = 5000 * 0.15 + 10000 * 0.25 + 10000 * 0.3 + 10000 * 0.33 + 10000 * 0.36 + 20000 * 0.38 + (S - 70000) * 0.4;

  return irpp;
}

function IRPPmensuel(p) {
  return IRPP(p) / 12;
}

function CSS(p) {
  return (Imposable(p) / 12) * 0.005;
}

function fc_net(p) {
  return calculateNetSocialAnnuel(p) / 12 - IRPPmensuel(p) - CSS(p);
}

/* -------------------- POST DECLARATION -------------------- */
exports.post_dec = async (req, res) => {
  if (!req.session.authorized)
    return res.status(401).json({ message: "not authorized", saved: false });

  try {
    const users = await dbQuery(
      "SELECT * FROM accounts WHERE email = ?",
      [req.session.email]
    );

    if (!users.length)
      return res.status(404).json({ message: "User not found", saved: false });

    const client_id = users[0].id;

    const date = `${req.body.annee}-${req.body.mois
      .toString()
      .padStart(2, "0")}-01`;

    const decls = await dbQuery(
      "SELECT * FROM declarations WHERE client_id = ? AND date = ?",
      [client_id, date]
    );

    const isEmpty =
      (!req.body.factures?.length) &&
      (!req.body.paie?.length) &&
      (!req.body.retenue?.length) &&
      toSafeNumber(req.body.ReportTVA) === 0;

    /* ---------------- EMPTY DELETE ---------------- */
    if (isEmpty && decls.length) {
      const dec_id = decls[0].id;

      await Promise.all([
        dbQuery("DELETE FROM summary WHERE dec_id=? AND client_id=?", [dec_id, client_id]),
        dbQuery("DELETE FROM factures WHERE decla_id=? AND client_id=?", [dec_id, client_id]),
        dbQuery("DELETE FROM paie WHERE decla_id=? AND client_id=?", [dec_id, client_id]),
        dbQuery("DELETE FROM retenue WHERE decla_id=? AND client_id=?", [dec_id, client_id]),
        dbQuery("DELETE FROM declarations WHERE id=? AND client_id=?", [dec_id, client_id]),
      ]);

      return res.json({ message: "Deleted empty declaration", saved: true });
    }

    let dec_id;

    if (!decls.length) {
      const r = await dbQuery(
        "INSERT INTO declarations SET ?",
        { date, client_id, reporttva: toSafeNumber(req.body.ReportTVA) }
      );
      dec_id = r.insertId;
    } else {
      dec_id = decls[0].id;
      await dbQuery(
        "UPDATE declarations SET reporttva=? WHERE id=? AND client_id=?",
        [toSafeNumber(req.body.ReportTVA), dec_id, client_id]
      );
    }

    /* ---------------- CALCULS ---------------- */
    let smm_tva_p1 = 0;
    let smm_tva_p2 = 0;
    let smm_tfp = 0;
    let smm_tcl = 0;
    let smm_ttrs = 0;
    let smm_droit = 0;
    let smm_foprolos = 0;

    const ops = [];

    /* FACTURES */
    (req.body.factures || []).forEach(f => {
      smm_tva_p1 += fc_tva_vente(f) - fc_tva_achat(f);
      smm_tfp += fc_ttc_vente(f) / 500;
      smm_tcl += fc_ttc_vente(f) / 500;
      smm_droit += toSafeNumber(f.Timbre);

      if (f.id > 0) {
        ops.push(dbQuery(`UPDATE factures SET ? WHERE id=? AND client_id=?`, [
          {
            date: f.Date,
            type: f.Type,
            ref: toSafeString(f.Ref),
            ht: toSafeNumber(f.TotalHT),
            tva: toSafeNumber(f.tva),
            mtfodec: toSafeNumber(f.MTFODEC),
            mtdc: toSafeNumber(f.MTDC),
            ttc: toSafeNumber(f.TotalTTC),
            ttc_vente: fc_ttc_vente(f),
          },
          f.id,
          client_id,
        ]));
      } else {
        ops.push(dbQuery("INSERT INTO factures SET ?", {
          decla_id: dec_id,
          client_id,
          date: f.Date,
          type: f.Type,
          ref: toSafeString(f.Ref),
          ht: toSafeNumber(f.TotalHT),
          tva: toSafeNumber(f.tva),
          mtfodec: toSafeNumber(f.MTFODEC),
          mtdc: toSafeNumber(f.MTDC),
          ttc: toSafeNumber(f.TotalTTC),
        }));
      }
    });

    /* PAIE */
    (req.body.paie || []).forEach(p => {
      smm_tfp += toSafeNumber(p.salaireBrut) / 100;
      smm_foprolos += toSafeNumber(p.salaireBrut) / 100;

      const payload = {
        secteur: p.typepaie,
        brut: toSafeNumber(p.salaireBrut),
        net: fc_net(p),
        irpp_a: IRPP(p),
        irpp_m: IRPPmensuel(p),
        css: CSS(p),
        decla_id: dec_id,
        client_id,
      };

      if (p.id > 0) {
        ops.push(dbQuery("UPDATE paie SET ? WHERE id=? AND client_id=?", [payload, p.id, client_id]));
      } else {
        ops.push(dbQuery("INSERT INTO paie SET ?", payload));
      }
    });

    /* RETENUE */
    (req.body.retenue || []).forEach(r => {
      smm_tva_p2 -= fc_tva_r(r);
      smm_ttrs += fc_retenue(r);
      smm_ttrs += fc_retenue_1000(r);

      const payload = {
        type: r.source,
        ht: toSafeNumber(r.montantHT),
        tva: toSafeNumber(r.tva),
        ttc: toSafeNumber(r.montantTTC),
        retenue: fc_retenue(r),
        decla_id: dec_id,
        client_id,
      };

      if (r.id > 0) {
        ops.push(dbQuery("UPDATE retenue SET ? WHERE id=? AND client_id=?", [payload, r.id, client_id]));
      } else {
        ops.push(dbQuery("INSERT INTO retenue SET ?", payload));
      }
    });

    /* SUMMARY */
    const smm_tva = Math.max(0, smm_tva_p1 + smm_tva_p2 - toSafeNumber(req.body.ReportTVA));

    const ttdec =
      smm_tva + smm_tfp + smm_tcl + smm_ttrs + smm_foprolos + smm_droit;

    const summary = {
      date,
      tva: smm_tva,
      tfp: smm_tfp,
      tcl: smm_tcl,
      ttrs: smm_ttrs,
      foprolos: smm_foprolos,
      droit: smm_droit,
      ttdec,
      reporttva: toSafeNumber(req.body.ReportTVA),
      dec_id,
      client_id,
    };

    if (!decls.length) {
      ops.push(dbQuery("INSERT INTO summary SET ?", summary));
    } else {
      ops.push(dbQuery("UPDATE summary SET ? WHERE dec_id=? AND client_id=?", [
        summary,
        dec_id,
        client_id,
      ]));
    }

    await Promise.all(ops);

    return res.json({ message: "Saved successfully", saved: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", saved: false });
  }
};