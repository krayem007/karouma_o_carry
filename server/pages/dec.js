const dotenv = require("dotenv");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");

dotenv.config({ path: "../.env" });

const db = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db,
});

function toSafeNumber(value) {
  if (value === null || value === undefined || value === '') return 0;
  const num = Number(value);
  if (isNaN(num)) return 0;
  return num;
}

function toNullableNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  if (isNaN(num)) return null;
  return num;
}

function toSafeString(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function fc_ttc_vente(facture) {
  if (facture.Type == "Facture de vente") return toSafeNumber(facture.TotalTTC);
  return 0;
}
function fc_ht_vente(facture) {
  if (facture.Type == "Facture de vente") return toSafeNumber(facture.TotalHT);
  return 0;
}

function fc_tva_vente(facture) {
  return (
    ((toSafeNumber(fc_ht_vente(facture)) + toSafeNumber(facture.MTFODEC) + toSafeNumber(facture.MTDC)) *
      toSafeNumber(facture.tva)) /
    100
  );
}

function fc_total_mtdc(facture) {
  if (facture.Type == "Facture de vente") return toSafeNumber(facture.MTDC);
  return 0;
}
function fc_total_fodec(facture) {
  if (facture.Type == "Facture de vente") return toSafeNumber(facture.MTFODEC);
  return 0;
}

function fc_ht_chat(facture) {
  if (facture.Type == "Facture d'achat") return toSafeNumber(facture.TotalHT);
  return 0;
}
function fc_tva_achat(facture) {
  if (facture.Type === "Facture d'achat") {
    return (
      ((toSafeNumber(facture.TotalHT) +
        toSafeNumber(facture.MTFODEC) +
        toSafeNumber(facture.MTDC)) *
        toSafeNumber(facture.tva)) /
      100
    );
  }
  return 0;
}

function fc_retenue_1000(facture) {
  const ttc = toSafeNumber(facture.TotalTTC);
  if (facture.Type === "Facture d'achat" && ttc > 1000) {
    return ttc * 0.1;
  }
  return 0;
}

function calcTotalAchatTTC1000(factures) {
  return factures.filter(f => {
    const ttc = Number(f.TotalTTC);
    return f.Type === "Facture d'achat" && !isNaN(ttc) && ttc > 1000;
  }).reduce((sum, f) => sum + Number(f.TotalTTC), 0);
}

// const paie = { salaireBrut: 1000, chef: "Non", enfants: 3 };
function calculateNetSocialAnnuel(paie) {
  const CNSS = 0.0968;
  const SB = paie.salaireBrut;
  return (SB - SB * CNSS) * 12;
}

function FondProfessionel(paie) {
  const netSocialAnnuel = calculateNetSocialAnnuel(paie);
  const FPpourcentage = netSocialAnnuel * 0.1;
  return FPpourcentage < 2000 ? FPpourcentage : 2000;
}

function NetFP(paie) {
  const FP = FondProfessionel(paie);
  console.log("3/fp:", FP);
  const netSocialAnnuel = calculateNetSocialAnnuel(paie);
  return netSocialAnnuel - FP;
}

function Abattement(paie) {
  if (paie.chef === "Oui" && paie.enfants === 0) {
    return 300;
  } else if (paie.chef == "Oui" && paie.enfants == 1) {
    return 400;
  } else if (paie.chef == "Oui" && paie.enfants == 2) {
    return 500;
  } else if (paie.chef == "Oui" && paie.enfants == 3) {
    return 600;
  } else if (paie.chef == "Oui" && paie.enfants > 3) {
    return 700;
  } else if (paie.chef == "Non") {
    return 0;
  } else {
    return 0;
  }
}

function Imposable(paie) {
  const NFP = NetFP(paie);
  const ABAT = Abattement(paie);
  return NFP - ABAT;
}

function IRPP(paie) {
  let irpp = 0;
  const SalaireImposable = Imposable(paie);
  if (SalaireImposable <= 5000) {
    irpp = 0;
  } else if (SalaireImposable <= 10000) {
    irpp = (SalaireImposable - 5000) * 0.15;
  } else if (SalaireImposable <= 20000) {
    irpp = 5000 * 0.15 + (SalaireImposable - 10000) * 0.25;
  } else if (SalaireImposable <= 30000) {
    irpp = 5000 * 0.15 + 10000 * 0.25 + (SalaireImposable - 20000) * 0.3;
  } else if (SalaireImposable <= 40000) {
    irpp =
      5000 * 0.15 +
      10000 * 0.25 +
      10000 * 0.3 +
      (SalaireImposable - 30000) * 0.33;
  } else if (SalaireImposable <= 50000) {
    irpp =
      5000 * 0.15 +
      10000 * 0.25 +
      10000 * 0.3 +
      10000 * 0.33 +
      (SalaireImposable - 40000) * 0.36;
  } else if (SalaireImposable <= 70000) {
    irpp =
      5000 * 0.15 +
      10000 * 0.25 +
      10000 * 0.3 +
      10000 * 0.33 +
      10000 * 0.36 +
      (SalaireImposable - 50000) * 0.38;
  } else {
    irpp =
      5000 * 0.15 +
      10000 * 0.25 +
      10000 * 0.3 +
      10000 * 0.33 +
      10000 * 0.36 +
      20000 * 0.38 +
      (SalaireImposable - 70000) * 0.4;
  }
  return irpp;
}

function IRPPmensuel(paie) {
  const IRPPannuel = IRPP(paie);
  return IRPPannuel / 12;
}

function ContributionSocialeSolidaire(paie) {
  const SalaireImposable = Imposable(paie);
  return (SalaireImposable / 12) * 0.005;
}

function fc_net(paie) {
  const netSocialAnnuel = calculateNetSocialAnnuel(paie) / 12;
  const CSS = ContributionSocialeSolidaire(paie);
  const irpp = IRPPmensuel(paie);
  return netSocialAnnuel - CSS - irpp;
}

// const result = RevenuNet(paie);

// console.log("NET FP:", result);

function fc_tva_r(retenue) {
  return retenue.montantTTC - retenue.montantHT;
}

function fc_retenue(retenue) {
  return retenue.montantTTC * 0.15;
}

// Promise-based db query wrapper
function dbQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

function fc_irpp_a(paie) {
  return IRPP(paie);
}
function fc_irpp_m(paie) {
  return IRPPmensuel(paie);
}
function fc_css(paie) {
  return ContributionSocialeSolidaire(paie);
}

exports.post_dec = async (req, res) => {
  if (req.session.authorized !== true) {
    console.log("not authorized");
    return res.status(401).json({ message: "not authorized", saved: false });
  }

  console.log("Request body:", req.body);

  try {
    // 1. Get client ID
    let dec_exsit = 0;
    const users = await dbQuery("SELECT * FROM accounts WHERE email = ?", [
      req.session.email,
    ]);
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found", saved: false });
    }
    const client_id = users[0].id;
    const date = `${req.body.annee}-${req.body.mois.toString().padStart(2, "0")}-00`;
    let reporttva = 0;
    if (req.body.ReportTVA === "") {
      console.log("if 3asba");
      reporttva = 0;
    } else {
      reporttva = req.body.ReportTVA;
    }
    // 2. Check if declaration exists or insert new
    const decls = await dbQuery(
      "SELECT * FROM declarations WHERE client_id = ? AND date = ?",
      [client_id, date],
    );
    let dec_id;

    if (decls.length === 0) {
      dec_exsit = 0;
      const r = await dbQuery("INSERT INTO declarations SET ?", {
        date,
        client_id,
        reporttva,
      });
      dec_id = r.insertId;
    } else {
      dec_exsit = 1;
      dec_id = decls[0].id;
      const r = await dbQuery(
        "UPDATE declarations SET reporttva = ? WHERE id = ? AND client_id = ?",
        [reporttva, dec_id, client_id],
      );
    }
    // 3. Prepare all operations
    const ops = [];
    let smm_tva_p1 = 0;
    let smm_droite_t = 0;
    let smm_tcl = 0;
    let total_mtdc = 0;
    let total_fodec = 0;

    // Factures
    req.body.factures.forEach((f, i) => {
      smm_tva_p1 = smm_tva_p1 + toSafeNumber(fc_tva_vente(f)) - toSafeNumber(fc_tva_achat(f));

      if (f.Type === "Facture de vente" && toSafeNumber(f.Timbre) > 0) {
        smm_droite_t = smm_droite_t + toSafeNumber(f.Timbre);
      }

      total_mtdc += fc_total_mtdc(f);
      total_fodec += fc_total_fodec(f);
      console.log(" total_fodec : ", total_fodec);
      console.log("smm_tva_p1 : ", smm_tva_p1);

      // Ensure these values are safe numbers
      let tauxdcValue = toSafeNumber(f.TauxDC);
      let ht = toSafeNumber(f.TotalHT);
      let tva = toSafeNumber(f.tva);
      let timber = toSafeNumber(f.Timbre);
      let mtfodec = toSafeNumber(f.MTFODEC);
      let mtdc = toSafeNumber(f.MTDC);
      let ttc = toSafeNumber(f.TotalTTC);
      let ttc_vente = toSafeNumber(fc_ttc_vente(f));
      let ht_vente = toSafeNumber(fc_ht_vente(f));
      let tva_vente = toSafeNumber(fc_tva_vente(f));
      let ht_chat = toSafeNumber(fc_ht_chat(f));
      let tva_achat = toSafeNumber(fc_tva_achat(f));
      let safe_ref = toSafeString(f.Ref);

      smm_tcl = smm_tcl + toSafeNumber(fc_ttc_vente(f)) / 500;
      console.log("gggg fuck me [", i, "] id: ", f.id);

      if (f.id > 0) {
        const sql = `
          UPDATE factures 
            SET date = ?, type = ?,type_achat_vente = ?, ref = ?, ht = ?, tva = ?, timber = ?,fodec = ?, mtfodec = ?, tauxdc = ?, mtdc = ?, ttc = ?, ttc_vente = ?, ht_vente = ?, tva_vente = ?, ht_chat = ?, tva_achat = ?
          WHERE id = ? AND client_id = ?`;
        const vals = [
          f.Date,
          f.Type,
          f.TypeAV,
          safe_ref,
          ht,
          tva,
          timber,
          f.FODEC,
          mtfodec,
          tauxdcValue,
          mtdc,
          ttc,
          ttc_vente,
          ht_vente,
          tva_vente,
          ht_chat,
          tva_achat,
          f.id,
          client_id,
        ];
        ops.push(dbQuery(sql, vals));
      } else {
        const row = {
          date: f.Date,
          type: f.Type,
          type_achat_vente: f.TypeAV,
          ref: safe_ref,
          ht: ht,
          tva: tva,
          timber: timber,
          fodec: f.FODEC,
          mtfodec: mtfodec,
          tauxdc: tauxdcValue,
          mtdc: mtdc,
          ttc: ttc,
          ttc_vente: ttc_vente,
          ht_vente: ht_vente,
          tva_vente: tva_vente,
          ht_chat: ht_chat,
          tva_achat: tva_achat,
          decla_id: dec_id,
          client_id,
        };
        ops.push(dbQuery("INSERT INTO factures SET ?", row));
      }
    });
    let smm_tfp = 0;
    let smm_foprolos = 0;
    let smm_tfp_part1 = 0;
    // Paie
    req.body.paie.forEach((p, i) => {
      let brut = toSafeNumber(p.salaireBrut);
      let num_kids = toSafeNumber(p.enfants);

      if ("Type 2" == p.typepaie) smm_tfp_part1 = brut / 100;
      else smm_tfp_part1 = brut / 50;

      smm_tfp = smm_tfp + smm_tfp_part1;
      smm_foprolos = smm_foprolos + brut / 100;
      console.log("gggg  chit paiee[", i, "] id: ", p.id);

      let safe_net = toSafeNumber(fc_net(p));
      let safe_irpp_a = toSafeNumber(fc_irpp_a(p));
      let safe_irpp_m = toSafeNumber(fc_irpp_m(p));
      let safe_css = toSafeNumber(fc_css(p));

      if (p.id > 0) {
        const sql = `
          UPDATE paie SET secteur = ?, salarier = ?, famille = ?, num_kids = ?, brut = ?, net = ?, irpp_a = ?, irpp_m = ?, css = ?
          WHERE id = ? AND client_id = ?`;
        const vals = [
          p.typepaie,
          p.Salarier,
          p.chef,
          num_kids,
          brut,
          safe_net,
          safe_irpp_a,
          safe_irpp_m,
          safe_css,
          p.id,
          client_id,
        ];
        ops.push(dbQuery(sql, vals));
      } else {
        const row = {
          secteur: p.typepaie,
          salarier: p.Salarier,
          famille: p.chef,
          num_kids: num_kids,
          brut: brut,
          net: safe_net,
          irpp_a: safe_irpp_a,
          irpp_m: safe_irpp_m,
          css: safe_css,
          decla_id: dec_id,
          client_id,
        };
        ops.push(dbQuery("INSERT INTO paie SET ?", row));
      }
    });
    let smm_tva_p2 = 0;
    // Retenue
    req.body.retenue.forEach((rtn, i) => {
      let ht = toSafeNumber(rtn.montantHT);
      let tva = toSafeNumber(rtn.tva);
      let ttc = toSafeNumber(rtn.montantTTC);
      let tva_r = toSafeNumber(fc_tva_r(rtn));
      let retenue_val = toSafeNumber(fc_retenue(rtn));

      smm_tva_p2 = smm_tva_p2 - tva_r;
      console.log("smm_tva_p2 : ", smm_tva_p2);
      console.log("gggg retune a  la hell [", i, "] id: ", rtn.id);
      if (rtn.id > 0) {
        const sql = `
          UPDATE retenue SET type = ?, ht = ?, tva = ?, ttc = ?, tva_r = ?, retenue = ?
          WHERE id = ? AND client_id = ?`;
        const vals = [
          rtn.source,
          ht,
          tva,
          ttc,
          tva_r,
          retenue_val,
          rtn.id,
          client_id,
        ];
        ops.push(dbQuery(sql, vals));
      } else {
        const row = {
          type: rtn.source,
          ht: ht,
          tva: tva,
          ttc: ttc,
          tva_r: tva_r,
          retenue: retenue_val,
          decla_id: dec_id,
          client_id,
        };
        ops.push(dbQuery("INSERT INTO retenue SET ?", row));
      }
    });
    let smm_tva = smm_tva_p1 + smm_tva_p2 - toSafeNumber(reporttva);
    if (smm_tva < 0) smm_tva = 0;
    let smm_ttrs = 0;

    // On calcule d'abord la somme des retenues
    req.body.retenue.forEach((rtn) => {
      smm_ttrs += toSafeNumber(fc_retenue(rtn)); // retenue simple
    });

    // À la fin, on ajoute IRPP mensuel et CSS de toutes les paies
    req.body.paie.forEach((paie) => {
      smm_ttrs += fc_irpp_m(paie) + fc_css(paie);
    });

    // Store retenue_1000 in each facture object and add to total smm_ttrs
    req.body.factures.forEach((f) => {
      f.retenue_1000 = fc_retenue_1000(f);
      smm_ttrs += f.retenue_1000;
    });

    // Maintenant tu peux calculer ton total final
    const smm_tt_dec =
      Math.round(
        (smm_tva +
          smm_tfp +
          smm_tcl +
          smm_ttrs +
          smm_foprolos +
          smm_droite_t +
          total_mtdc +
          total_fodec) *
        1000,
      ) / 1000;

    const row = {
      date: date,
      ttrs: smm_ttrs,
      tfp: smm_tfp,
      foprolos: smm_foprolos,
      droit: total_mtdc,
      fodec: total_fodec,
      tva: smm_tva,
      dtf: smm_droite_t,
      tcl: smm_tcl,
      ttdec: smm_tt_dec,
      reporttva: reporttva,
      dec_id: dec_id,
      client_id: client_id,
    };

    const vals = [
      smm_ttrs,
      smm_tfp,
      smm_foprolos,
      total_mtdc,
      total_fodec,
      smm_tva,
      smm_droite_t,
      smm_tcl,
      smm_tt_dec,
      reporttva,
      dec_id,
      client_id,
    ];
    if (dec_exsit == 0) ops.push(dbQuery("INSERT INTO summary SET ?", row));
    else
      ops.push(
        dbQuery(
          `UPDATE summary SET ttrs = ?, tfp = ?, foprolos = ?, droit = ?, fodec = ?, tva = ?, dtf = ?, tcl = ?, ttdec = ?, reporttva = ?
          WHERE dec_id = ? AND client_id = ?`,
          vals,
        ),
      );
    // Deletes
    req.body.deleteFactureIds.forEach((id) => {
      ops.push(
        dbQuery("DELETE FROM factures WHERE id = ? AND client_id = ?", [
          id,
          client_id,
        ]),
      );
    });
    req.body.deletePaieIds.forEach((id) => {
      ops.push(
        dbQuery("DELETE FROM paie WHERE id = ? AND client_id = ?", [
          id,
          client_id,
        ]),
      );
    });
    req.body.deleteRetenueIds.forEach((id) => {
      ops.push(
        dbQuery("DELETE FROM retenue WHERE id = ? AND client_id = ?", [
          id,
          client_id,
        ]),
      );
    });

    // 4. Run everything
    await Promise.all(ops);

    // 5. Send final response
    return res
      .status(200)
      .json({ message: "All database operations completed", saved: true });
  } catch (err) {
    console.error("Database operation failed:", err);
    return res
      .status(500)
      .json({ message: "Operation failed", error: err.message, saved: false });
  }
};

exports.get_dec = async (req, res) => {
  if (req.session.authorized != true) {
    console.error("not authoraised");
    return res.status(500).json({ message: "not authoraised", del: false });
  }
  console.log("req.body ==> ", req.body);
  const date = req.body.annee + "-" + req.body.mois.toString() + "-00";
  await db.query(
    "SELECT * FROM accounts WHERE email = ?",
    [req.session.email],
    (error, results) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "server error", saved: false });
      }

      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "User not found", saved: false });
      }
      const client_id = results[0].id;
      const query = `
        SELECT * FROM declarations
        WHERE client_id = ? AND date = ?
      `;

      db.query(query, [client_id, date], (err, results) => {
        if (err) {
          console.error("DB error:", err);
          return res
            .status(500)
            .json({ message: "Database error", dec: false });
        }
        console.log("query decla results : ", results);
        //res.json(results);
        if (results.length === 0) {
          return res.status(200).json({
            message: "declaration not found",
            dec: false,
            not_found: true,
          });
        }
        const decla_id = results[0].id;
        const reporttva = results[0].reporttva;
        const query2 = `
        SELECT * FROM factures
        WHERE decla_id = ?`;
        const query3 = `
        SELECT * FROM paie
        WHERE decla_id = ?`;
        const query4 = `
        SELECT * FROM retenue
        WHERE decla_id = ?`;
        let factures = [];
        let paie = [];
        let retenue = [];
        db.query(query2, [decla_id], (err, results) => {
          if (err) {
            console.error("DB error:", err);
            return res
              .status(500)
              .json({ message: "Database error", dec: false });
          }
          console.log("query factures results : ", results);
          factures = results;
          db.query(query3, [decla_id], (err, results) => {
            if (err) {
              console.error("DB error:", err);
              return res
                .status(500)
                .json({ message: "Database error", dec: false });
            }
            console.log("query paie results : ", results);
            paie = results;
            db.query(query4, [decla_id], (err, results) => {
              if (err) {
                console.error("DB error:", err);
                return res
                  .status(500)
                  .json({ message: "Database error", dec: false });
              }
              console.log("query retenue results : ", results);
              retenue = results;
              const send_data = { reporttva, factures, paie, retenue };
              return res.json({ send_data, dec: true });
            });
          });
        });
      });
    },
  );
};
