const puppeteer = require("puppeteer");
const path = require("path"); // <-- add this
const dotenv = require("dotenv");
const mysql = require("mysql2");
const fs = require("fs").promises;
const handlebars = require("handlebars");
const { Readable } = require("stream");
const os = require("os");

dotenv.config({ path: "../.env" });

const db = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db,
  dateStrings: true
});

// Promise-based db query wrapper
function dbQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

handlebars.registerHelper("fr", function (value) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(value);
});


function getTauxRetenue1000(facture, default_nature, default_regime) {
  // Priorité aux données du bénéficiaire saisies dans la facture, sinon profil client
  const nature = facture.nature_beneficiaire || default_nature;
  const regime = facture.regime_beneficiaire || default_regime;

  if (nature === 'PP') return 0.015;
  if (nature === 'PM') {
    if (regime === 'IS_10') return 0.005;
    if (regime === 'IS_20' || regime === 'IS_15') return 0.010;
    return 0.015;
  }
  return 0;
}

function calculateRetenueAchat1000(facture, default_nature, default_regime) {
  const ttc = Number(facture.ttc);
  if (facture.type === "Facture d'achat" && !isNaN(ttc) && ttc >= 1000) {
    const mtManuel = facture.montant_retenue_calcule;
    if (mtManuel != null && mtManuel !== '') return Number(mtManuel);
    return Math.round(ttc * getTauxRetenue1000(facture, default_nature, default_regime) * 1000) / 1000;
  }
  return 0;
}

function calculateTotalAchatTTC1000(factures) {
  return factures
    .filter((f) => f.type === "Facture d'achat" && Number(f.ttc) >= 1000)
    .reduce((sum, f) => sum + Number(f.ttc), 0);
}

exports.welcome = async (req, res) => {
  console.log("summary func : ", req.body);
  if (req.session.authorized == true) {
    //res.json({"authorized" : "true" })
    const query = `
        SELECT date, ttrs, tfp, foprolos, droit,fodec, tva, dtf, tcl, ttdec FROM summary
        WHERE client_id = ? `;
    db.query(query, req.session.user, (err, results) => {
      if (err) {
        console.error("DB error:", err);
        return res
          .status(500)
          .json({ message: "Database error", authorized: "true" });
      }
      console.log("query summary results : ", results);
      return res.json({ summary: results, authorized: "true" });
    });
  } else {
    res.json({ authorized: "false" });
  }
};

exports.print_doc = async (req, res) => {
  if (req.session.authorized !== true) {
    return res.json({ authorized: "false" });
  }
  const users = await dbQuery("SELECT * FROM accounts WHERE id = ?", [
    req.session.user,
  ]);
  if (users.length === 0) {
    return res.status(404).json({ message: "User not found", saved: false });
  }

  const decl_date = req.body[0];
  console.log("decl_date :", decl_date);
  console.log("user data:", users);

  const dec = await dbQuery(
    "SELECT id FROM declarations WHERE client_id = ? and date = ?",
    [req.session.user, decl_date],
  );
  if (dec.length !== 1) {
    return res.status(404).json({ message: "dec not found", saved: false });
  }

  const dec_id = dec[0].id;

  const factures = await dbQuery(
    "SELECT * FROM factures WHERE client_id = ? and decla_id = ?",
    [req.session.user, dec_id],
  );
  const paie = await dbQuery(
    "SELECT * FROM paie     WHERE client_id = ? and decla_id = ?",
    [req.session.user, dec_id],
  );
  const retenue = await dbQuery(
    "SELECT * FROM retenue  WHERE client_id = ? and decla_id = ?",
    [req.session.user, dec_id],
  );
  const summary = await dbQuery(
    "SELECT * FROM summary  WHERE client_id = ? and dec_id   = ?",
    [req.session.user, dec_id],
  );
  if (summary.length !== 1) {
    return res.status(404).json({ message: "summary not found", saved: false });
  }
  let html_data = users[0];
  html_data.summary = summary[0];
  html_data.reporttva = Number(html_data.summary.reporttva ?? 0);
  const now = new Date();
  html_data.decl_date = decl_date;
  html_data.len_factures = factures.length;
  html_data.factures = factures;
  let total_ht_vente_19 = 0;
  for (let i = 0; i < html_data.factures.length; i++) {
    const f = html_data.factures[i];
    if (f.type === "Facture de vente" && f.tva === 19) {
      total_ht_vente_19 += f.ht_vente + f.mtfodec + f.mtdc;
    }
  }
  html_data.total_ht_vente_19 = total_ht_vente_19;
  html_data.total_ht_vente_19_t = total_ht_vente_19 * 0.19;

  let total_ht_vente_13 = 0;
  for (let i = 0; i < html_data.factures.length; i++) {
    const f = html_data.factures[i];
    if (f.type === "Facture de vente" && f.tva === 13) {
      total_ht_vente_13 += f.ht_vente + f.mtfodec + f.mtdc;
    }
  }
  html_data.total_ht_vente_13 = total_ht_vente_13;
  html_data.total_ht_vente_13_t = total_ht_vente_13 * 0.13;
  let total_ht_vente_7 = 0;
  for (let i = 0; i < html_data.factures.length; i++) {
    const f = html_data.factures[i];
    if (f.type === "Facture de vente" && f.tva === 7) {
      total_ht_vente_7 += f.ht_vente + f.mtfodec + f.mtdc;
    }
  }
  html_data.total_ht_vente_7 = total_ht_vente_7;
  html_data.total_ht_vente_7_t = total_ht_vente_7 * 0.07;
  html_data.tot_ht_vente_t =
    html_data.total_ht_vente_7_t +
    html_data.total_ht_vente_13_t +
    html_data.total_ht_vente_19_t;

  html_data.tot_ht_vente =
    html_data.total_ht_vente_7 +
    html_data.total_ht_vente_13 +
    html_data.total_ht_vente_19;
  let total_mtdc = 0;
  for (let i = 0; i < html_data.factures.length; i++) {
    const f = html_data.factures[i];
    if (f.type === "Facture de vente") {
      total_mtdc += f.mtdc;
    }
  }
  html_data.total_mtdc = total_mtdc;

  html_data.mtdc_PR = html_data.total_mtdc > 0 ? "P" : "R";

  let total_timber = 0;
  for (let i = 0; i < html_data.factures.length; i++) {
    const f = html_data.factures[i];
    if (f.type === "Facture de vente" && f.timber > 0) {
      total_timber += f.timber;
    }
  }
  html_data.total_timber = total_timber;
  let nbr_timber = 0;
  for (let i = 0; i < html_data.factures.length; i++) {
    const f = html_data.factures[i];
    if (f.type === "Facture de vente" && f.timber > 0) {
      nbr_timber++;
    }
  }
  html_data.number_of_timber = nbr_timber;

  let tot_ttc_vente = 0;
  for (let i = 0; i < html_data.factures.length; i++) {
    tot_ttc_vente += html_data.factures[i].ttc_vente;
  }
  html_data.tot_ttc_vente = tot_ttc_vente;
  html_data.tot_ttc_vente_02 = tot_ttc_vente * 0.002;

  html_data.len_paie = paie.length;
  html_data.paie = paie;
  let total_css = 0;
  for (let i = 0; i < html_data.paie.length; i++) {
    total_css += html_data.paie[i].css;
  }
  html_data.total_css = total_css;

  let tot_irpp_a = 0;
  for (let i = 0; i < html_data.paie.length; i++) {
    tot_irpp_a += html_data.paie[i].irpp_a;
  }
  html_data.tot_irpp_a = tot_irpp_a;
  let tot_irpp_m = 0;
  for (let i = 0; i < html_data.paie.length; i++) {
    tot_irpp_m += html_data.paie[i].irpp_m;
  }
  html_data.tot_irpp_m = tot_irpp_m;
  const secteur = html_data.secteur || 'Type 2';
  let total_brut = 0;
  for (let i = 0; i < html_data.paie.length; i++) {
    total_brut += html_data.paie[i].brut;
  }
  let total_brut_type1 = secteur === "Type 1" ? total_brut : 0;
  let total_brut_type2 = secteur === "Type 2" ? total_brut : 0;
  html_data.total_brut_type2 = total_brut_type2;
  html_data.total_brut_type2_2 = total_brut_type2 * 0.02;
  html_data.total_brut_type1 = total_brut_type1;
  html_data.total_brut_type1_1 = total_brut_type1 * 0.01;
  html_data.total_brut_type_tot =
    html_data.total_brut_type2_2 + html_data.total_brut_type1_1;
  html_data.total_brut_type_PR = html_data.total_brut_type_tot > 0 ? "P" : "R";
  html_data.total_brut_tot =
    html_data.total_brut_type2 + html_data.total_brut_type1;
  html_data.total_brut_tot_1 = html_data.total_brut_tot * 0.01;
  html_data.len_retenue = retenue.length;
  html_data.retenue = retenue;

  let tot_loyer_ht = 0;
  let tot_loyer_val = 0;
  let tot_honoraires_pp_forfaitaire_ht = 0;
  let tot_honoraires_pp_forfaitaire_val = 0;
  let tot_honoraires_pp_reel_pm_ht = 0;
  let tot_honoraires_pp_reel_pm_val = 0;

  for (let i = 0; i < html_data.retenue.length; i++) {
    const rtn = html_data.retenue[i];
    const source = rtn.type; // "Type 1" (Loyer) or "Type 2" (Honoraires)
    const nature = rtn.nature_beneficiaire;
    const regime = rtn.regime_fiscal;
    const ttc = rtn.ttc;
    const retenue_val = rtn.retenue;

    if (source === "Type 1" || source === "Loyer" || source === "LOYER") {
      tot_loyer_ht += ttc;
      tot_loyer_val += retenue_val;
    } else if (source === "Type 2" || source === "Honoraires" || source === "HONORAIRES") {
      if (nature === "PP" && regime === "FORFAITAIRE") {
        tot_honoraires_pp_forfaitaire_ht += ttc;
        tot_honoraires_pp_forfaitaire_val += retenue_val;
      } else {
        tot_honoraires_pp_reel_pm_ht += ttc;
        tot_honoraires_pp_reel_pm_val += retenue_val;
      }
    }
  }

  html_data.tot_loyer_ht = tot_loyer_ht;
  html_data.tot_loyer_val = tot_loyer_val;
  html_data.tot_honoraires_pp_forfaitaire_ht = tot_honoraires_pp_forfaitaire_ht;
  html_data.tot_honoraires_pp_forfaitaire_val = tot_honoraires_pp_forfaitaire_val;
  html_data.tot_honoraires_pp_reel_pm_ht = tot_honoraires_pp_reel_pm_ht;
  html_data.tot_honoraires_pp_reel_pm_val = tot_honoraires_pp_reel_pm_val;

  let total_ht_retenue_achat = 0;

  for (let i = 0; i < html_data.retenue.length; i++) {
    total_ht_retenue_achat += html_data.retenue[i].ht;
  }
  for (let i = 0; i < html_data.factures.length; i++) {
    if (
      html_data.factures[i].type === "Facture d'achat" &&
      html_data.factures[i].type_achat_vente === "Autres achats locaux"
    )
      total_ht_retenue_achat +=
        html_data.factures[i].ht_chat +
        html_data.factures[i].mtfodec +
        html_data.factures[i].mtdc;
  }
  html_data.total_ht_retenue_achat = total_ht_retenue_achat;

  let total_tva_retenue_achat = 0;
  for (let i = 0; i < html_data.retenue.length; i++) {
    total_tva_retenue_achat += html_data.retenue[i].tva_r;
  }
  for (let i = 0; i < html_data.factures.length; i++) {
    if (
      html_data.factures[i].type === "Facture d'achat" &&
      html_data.factures[i].type_achat_vente === "Autres achats locaux"
    )
      total_tva_retenue_achat += html_data.factures[i].tva_achat;
  }
  html_data.total_tva_retenue_achat = total_tva_retenue_achat;

  let total_ht_autre_achat_impor = 0;

  for (let i = 0; i < html_data.factures.length; i++) {
    if (
      html_data.factures[i].type === "Facture d'achat" &&
      html_data.factures[i].type_achat_vente === "Autres achats importés"
    )
      total_ht_autre_achat_impor +=
        html_data.factures[i].ht_chat +
        html_data.factures[i].mtfodec +
        html_data.factures[i].mtdc;
  }
  html_data.total_ht_autre_achat_impor = total_ht_autre_achat_impor;

  let total_tva_autre_achat_impor = 0;
  for (let i = 0; i < html_data.factures.length; i++) {
    if (
      html_data.factures[i].type === "Facture d'achat" &&
      html_data.factures[i].type_achat_vente === "Autres achats importés"
    )
      total_tva_autre_achat_impor += html_data.factures[i].tva_achat;
  }
  html_data.total_tva_autre_achat_impor = total_tva_autre_achat_impor;

  let total_ht_equip_achat_impor = 0;

  for (let i = 0; i < html_data.factures.length; i++) {
    if (
      html_data.factures[i].type === "Facture d'achat" &&
      html_data.factures[i].type_achat_vente === "Achat d’équipement importé"
    )
      total_ht_equip_achat_impor +=
        html_data.factures[i].ht_chat +
        html_data.factures[i].mtfodec +
        html_data.factures[i].mtdc;
  }
  html_data.total_ht_equip_achat_impor = total_ht_equip_achat_impor;

  let total_tva_equip_achat_impor = 0;
  for (let i = 0; i < html_data.factures.length; i++) {
    if (
      html_data.factures[i].type === "Facture d'achat" &&
      html_data.factures[i].type_achat_vente === "Achat d’équipement importé"
    )
      total_tva_equip_achat_impor += html_data.factures[i].tva_achat;
  }
  html_data.total_tva_equip_achat_impor = total_tva_equip_achat_impor;

  let total_ht_equip_achat_loc = 0;

  for (let i = 0; i < html_data.factures.length; i++) {
    if (
      html_data.factures[i].type === "Facture d'achat" &&
      html_data.factures[i].type_achat_vente === "Achat d’équipement local"
    )
      total_ht_equip_achat_loc +=
        html_data.factures[i].ht_chat +
        html_data.factures[i].mtfodec +
        html_data.factures[i].mtdc;
  }
  html_data.total_ht_equip_achat_loc = total_ht_equip_achat_loc;

  let total_tva_equip_achat_loc = 0;
  for (let i = 0; i < html_data.factures.length; i++) {
    if (
      html_data.factures[i].type === "Facture d'achat" &&
      html_data.factures[i].type_achat_vente === "Achat d’équipement local"
    )
      total_tva_equip_achat_loc += html_data.factures[i].tva_achat;
  }
  html_data.total_tva_equip_achat_loc = total_tva_equip_achat_loc;

  let total_ht_fodec = 0;

  for (let i = 0; i < html_data.factures.length; i++) {
    if (html_data.factures[i].type === "Facture de vente")
      total_ht_fodec += html_data.factures[i].ht_vente;
  }
  html_data.total_ht_fodec = total_ht_fodec;

  let total_fodec = 0;
  for (let i = 0; i < html_data.factures.length; i++) {
    if (html_data.factures[i].type === "Facture de vente")
      total_fodec += html_data.factures[i].mtfodec;
  }
  html_data.total_fodec = total_fodec;

  let tot_tva_achat =
    Number(html_data.total_tva_retenue_achat) +
    Number(html_data.total_tva_equip_achat_loc) +
    Number(html_data.total_tva_equip_achat_impor) +
    Number(html_data.total_tva_autre_achat_impor);

  html_data.tot_tva_achat = tot_tva_achat;

  let difference = html_data.tot_ht_vente_t - tot_tva_achat;
  if (difference <= 0) {
    html_data.total_tva = Math.abs(difference);
  } else {
    html_data.total_tva = difference;
  }
  html_data.total_tva_PR = difference >= 0 ? "P" : "R";

  const reporttva = html_data.reporttva;

  let differencefin = difference - reporttva;

  if (differencefin <= 0) {
    html_data.total_tva_fin = Math.abs(differencefin);
  } else {
    html_data.total_tva_fin = differencefin;
  }
  html_data.total_tva_fin_PR = differencefin >= 0 ? "P" : "R";
  if (differencefin <= 0) {
    html_data.total_tva_sum = 0;
  } else {
    html_data.total_tva_sum = differencefin;
  }
  html_data.tot_achat_ttc_1000 = calculateTotalAchatTTC1000(html_data.factures);

  // === Retenue à la source — Section 2 : tous cas ===
  let tot_retenue_1000 = 0; // Total GLOBAL (tous cas)

  // PP → 1,5%
  let tot_retenue_1000_pp = 0;
  let tot_achat_ttc_1000_pp = 0;

  // PM + IS autre que 10% ou 20% → 1,5%
  let tot_retenue_1000_pm_15 = 0;
  let tot_achat_ttc_1000_pm_15 = 0;

  // PM + IS = 20% → 1%
  let tot_retenue_1000_pm_10 = 0;
  let tot_achat_ttc_1000_pm_10 = 0;

  // PM + IS = 10% → 0,5%
  let tot_retenue_1000_pm_05 = 0;
  let tot_achat_ttc_1000_pm_05 = 0;

  for (let i = 0; i < html_data.factures.length; i++) {
    const f = html_data.factures[i];
    // On passe la nature et le régime du client comme secours (priorité aux données bénéficiaire de la facture)
    f.retenue_1000 = calculateRetenueAchat1000(f, html_data.nature_entite, html_data.details_regime);
    tot_retenue_1000 += f.retenue_1000;

    const ttc = Number(f.ttc);
    if (f.type === "Facture d'achat" && !isNaN(ttc) && ttc >= 1000) {
      // On détermine le taux effectif utilisé
      const taux = getTauxRetenue1000(f, html_data.nature_entite, html_data.details_regime);

      const nature_eff = f.nature_beneficiaire || html_data.nature_entite;
      if (nature_eff === 'PP') {
        tot_retenue_1000_pp += f.retenue_1000;
        tot_achat_ttc_1000_pp += ttc;
      } else if (nature_eff === 'PM') {
        if (taux === 0.015) {
          tot_retenue_1000_pm_15 += f.retenue_1000;
          tot_achat_ttc_1000_pm_15 += ttc;
        } else if (taux === 0.010) {
          tot_retenue_1000_pm_10 += f.retenue_1000;
          tot_achat_ttc_1000_pm_10 += ttc;
        } else if (taux === 0.005) {
          tot_retenue_1000_pm_05 += f.retenue_1000;
          tot_achat_ttc_1000_pm_05 += ttc;
        }
      }
    }
  }

  // Total global
  html_data.tot_retenue_1000 = tot_retenue_1000;

  // Cas PP (1,5%)
  html_data.tot_retenue_1000_pp = tot_retenue_1000_pp;
  html_data.tot_achat_ttc_1000_pp = tot_achat_ttc_1000_pp;

  // Cas PM + IS autre (1,5%)
  html_data.tot_retenue_1000_pm_15 = tot_retenue_1000_pm_15;
  html_data.tot_achat_ttc_1000_pm_15 = tot_achat_ttc_1000_pm_15;

  // Cas PM + IS 20% (1%)
  html_data.tot_retenue_1000_pm_10 = tot_retenue_1000_pm_10;
  html_data.tot_achat_ttc_1000_pm_10 = tot_achat_ttc_1000_pm_10;

  // Cas PM + IS 10% (0,5%)
  html_data.tot_retenue_1000_pm_05 = tot_retenue_1000_pm_05;
  html_data.tot_achat_ttc_1000_pm_05 = tot_achat_ttc_1000_pm_05;

  // Combined 1.5% (PP + PM-15)
  html_data.tot_retenue_1000_1_5 = tot_retenue_1000_pp + tot_retenue_1000_pm_15;
  html_data.tot_achat_ttc_1000_1_5 = tot_achat_ttc_1000_pp + tot_achat_ttc_1000_pm_15;

  html_data.mouwared =
    html_data.tot_irpp_m + html_data.total_css + html_data.tot_loyer_val + html_data.tot_honoraires_pp_forfaitaire_val + html_data.tot_honoraires_pp_reel_pm_val + html_data.tot_retenue_1000;
  html_data.declaration =
    html_data.mouwared +
    html_data.total_brut_type_tot +
    html_data.total_brut_tot_1 +
    html_data.total_tva_sum +
    html_data.total_timber +
    html_data.total_fodec +
    html_data.total_mtdc +
    html_data.tot_ttc_vente_02;
  html_data.month1 = decl_date.split("-")[1][1];
  html_data.month0 = decl_date.split("-")[1][0];
  html_data.year3 = decl_date.split("-")[0][3];
  html_data.year2 = decl_date.split("-")[0][2];
  html_data.year1 = decl_date.split("-")[0][1];
  html_data.year0 = decl_date.split("-")[0][0];

  if (html_data.summary.ttrs > 0) {
    html_data.X_retenue = "X";
  } else {
    html_data.X_retenue = "";
  }

  if (html_data.summary.tfp > 0) {
    html_data.X_tfp = "X";
  } else {
    html_data.X_tfp = "";
  }

  if (html_data.summary.foprolos > 0) {
    html_data.X_foprolos = "X";
  } else {
    html_data.X_foprolos = "";
  }
  if (html_data.summary.dtf > 0) {
    html_data.X_dtf = "X";
  } else {
    html_data.X_dtf = "";
  }
  if (html_data.summary.tcl > 0) {
    html_data.X_tcl = "X";
  } else {
    html_data.X_tcl = "";
  }
  if (html_data.tot_ht_vente_t != 0 || html_data.tot_tva_achat != 0) {
    html_data.X_tva = "X";
  } else {
    html_data.X_tva = "";
  }

  if (html_data.total_mtdc > 0) {
    html_data.X_dc = "X";
  } else {
    html_data.X_dc = "";
  }
  let identifiant = html_data.identifiant_fiscal;
  let chars_identifiant_fiscal = identifiant.split("");
  while (chars_identifiant_fiscal.length < 8) {
    chars_identifiant_fiscal.push("");
  }
  html_data.identifiant_fiscal_chars = chars_identifiant_fiscal;
  let code_postal = String(html_data.code_postal);
  let chars_code_postal = code_postal.split("");
  while (chars_code_postal.length < 4) {
    chars_code_postal.push("");
  }
  html_data.code_postal_chars = chars_code_postal;

  let d = new Date(html_data.activite_date);
  let year = d.getFullYear().toString();
  let month = String(d.getMonth() + 1).padStart(2, "0");
  let day = String(d.getDate()).padStart(2, "0");
  html_data.year0_act = year[0];
  html_data.year1_act = year[1];
  html_data.year2_act = year[2];
  html_data.year3_act = year[3];
  html_data.month0_act = month[0];
  html_data.month1_act = month[1];
  html_data.day0_act = day[0];
  html_data.day1_act = day[1];
  const options = { day: "numeric", month: "long", year: "numeric" };
  const gen_date = now.toLocaleDateString("fr-FR", options);
  html_data.gen_date = gen_date;
  console.log("html_data : ", html_data);

  let browser;
  try {
    // Load and compile Handlebars template
    const templatePath = path.join(
      __dirname,
      "../print_js/formulaire_declaration_tva.hbs",
    );
    const htmlTemplate = await fs.readFile(templatePath, "utf8");
    const template = handlebars.compile(htmlTemplate);
    const finalHtml = template(html_data);

    // Save the rendered HTML to a temp file so Puppeteer can resolve relative paths
    // gggg [bug check] need to double check if this does create multi file or have mutex issue when multi req come from multi user
    const tempHtmlPath = path.join(__dirname, "../print_js/_temp_render.html");
    await fs.writeFile(tempHtmlPath, finalHtml, "utf8");

    console.log("✅ HTML rendered to:", tempHtmlPath);

    // Launch Puppeteer
    const puppeteer = require("puppeteer-core");

    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome", headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Load HTML file from disk — relative CSS and images now work!
    const fileUrl = "file://" + tempHtmlPath;
    await page.goto(fileUrl, { waitUntil: "networkidle0" });

    // Generate PDF as a stream
    const pdfStream = await page.createPDFStream({
      printBackground: true,
      // format: "A4", // uncomment if you want to enforce A4
    });

    // Convert WHATWG stream → Node.js stream
    const nodeStream = Readable.fromWeb(pdfStream);

    // Send PDF as response
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="mypage.pdf"',
    });

    nodeStream.pipe(res);

    // Cleanup
    nodeStream.on("end", async () => {
      await browser.close();
      console.log("✅ PDF stream completed and browser closed.");
    });

    nodeStream.on("error", async (err) => {
      console.error("❌ PDF stream error:", err);
      await browser.close();
      if (!res.headersSent) res.status(500).send("Failed to stream PDF");
    });
  } catch (err) {
    console.error("❌ print_doc error:", err);
    if (browser) {
      try {
        await browser.close();
      } catch (e) { }
    }
    res.status(500).send("Failed to generate PDF: " + (err?.message || err));
  }
};
