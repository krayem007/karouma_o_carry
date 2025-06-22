const dotenv = require('dotenv');
const mysql = require("mysql");
const bcrypt = require('bcryptjs');

dotenv.config({path: '../.env'});

const db = mysql.createConnection({
    host: process.env.db_host,
    user : process.env.db_user,
    password: process.env.db_password,
    database: process.env.db
});


function fc_ttc_vente(facture) {
  if (facture.Type == 'Facture de vente')
    return facture.TotalTTC;
  return 0;
}
function fc_ht_vente(facture) {
  if (facture.Type == 'Facture de vente')
    return facture.TotalHT;
  return 0;
}
function fc_ht_chat(facture) {
  if (facture.Type == "Facture d'achat")
    return facture.TotalHT;
  return 0;
}
function fc_tva_achat(facture) {
  if (facture.Type == "Facture d'achat")
    return facture.TotalHT* facture.tva /100;
  return 0;
}
function fc_net(paie) {
  return 1;
}
function fc_irpp_a(paie) {
  return 1;
}
function fc_irpp_m(paie) {
  return 1;
}
function fc_css(paie) {
  return 1;
}
function fc_tva_r(retenue) {
  return 1;
}
function fc_retenue(retenue) {
  return 1;
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

exports.post_dec = async (req, res) => {
  if (req.session.authorized !== true) {
    console.log('not authorized');
    return res.status(401).json({ message: 'not authorized', saved: false });
  }

  console.log("Request body:", req.body);

  try {
    // 1. Get client ID
    const users = await dbQuery('SELECT * FROM accounts WHERE email = ?', [req.session.email]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found', saved: false });
    }
    const client_id = users[0].id;
    const date = `${req.body.annee}-${req.body.mois.toString().padStart(2, '0')}-00`;

    // 2. Check if declaration exists or insert new
    const decls = await dbQuery('SELECT * FROM declarations WHERE client_id = ? AND date = ?', [client_id, date]);
    let dec_id;

    if (decls.length === 0) {
      const r = await dbQuery('INSERT INTO declarations SET ?', { date, client_id });
      dec_id = r.insertId;
    } else {
      dec_id = decls[0].id;
    }

    // 3. Prepare all operations
    const ops = [];

    // Factures
    req.body.factures.forEach((f, i) => {
      if (f.id > 0) {
        const sql = `
          UPDATE factures 
            SET date = ?, type = ?, ref = ?, ht = ?, tva = ?, timber = ?, ttc = ?, ttc_vente = ?, ht_vente = ?, ht_chat = ?, tva_achat = ?
          WHERE id = ? AND client_id = ?`;
        const vals = [
          f.Date, f.Type, f.Ref, f.TotalHT, f.tva, f.Timbre, f.TotalTTC,
          fc_ttc_vente(f), fc_ht_vente(f), fc_ht_chat(f), fc_tva_achat(f),
          f.id, client_id
        ];
        ops.push(dbQuery(sql, vals));
      } else {
        const row = {
          date: f.Date,
          type: f.Type,
          ref: f.Ref,
          ht: f.TotalHT,
          tva: f.tva,
          timber: f.Timbre,
          ttc: f.TotalTTC,
          ttc_vente: fc_ttc_vente(f),
          ht_vente: fc_ht_vente(f),
          ht_chat: fc_ht_chat(f),
          tva_achat: fc_tva_achat(f),
          decla_id: dec_id,
          client_id
        };
        ops.push(dbQuery('INSERT INTO factures SET ?', row));
      }
    });

    // Paie
    req.body.paie.forEach((p, i) => {
      if (p.id > 0) {
        const sql = `
          UPDATE paie SET secteur = ?, salarier = ?, famille = ?, num_kids = ?, brut = ?, net = ?, irpp_a = ?, irpp_m = ?, css = ?
          WHERE id = ? AND client_id = ?`;
        const vals = [
          p.typepaie, p.Salarier, p.chef, p.enfants, p.salaireBrut,
          fc_net(p), fc_irpp_a(p), fc_irpp_m(p), fc_css(p),
          p.id, client_id
        ];
        ops.push(dbQuery(sql, vals));
      } else {
        const row = {
          secteur: p.typepaie,
          salarier: p.Salarier,
          famille: p.chef,
          num_kids: p.enfants,
          brut: p.salaireBrut,
          net: fc_net(p),
          irpp_a: fc_irpp_a(p),
          irpp_m: fc_irpp_m(p),
          css: fc_css(p),
          decla_id: dec_id,
          client_id
        };
        ops.push(dbQuery('INSERT INTO paie SET ?', row));
      }
    });

    // Retenue
    req.body.retenue.forEach((rtn, i) => {
      if (rtn.id > 0) {
        const sql = `
          UPDATE retenue SET type = ?, ht = ?, tva = ?, ttc = ?, tva_r = ?, retenue = ?
          WHERE id = ? AND client_id = ?`;
        const vals = [
          rtn.source, rtn.montantHT, rtn.TVA, rtn.montantTTC,
          fc_tva_r(rtn), fc_retenue(rtn),
          rtn.id, client_id
        ];
        ops.push(dbQuery(sql, vals));
      } else {
        const row = {
          type: rtn.source,
          ht: rtn.montantHT,
          tva: rtn.TVA,
          ttc: rtn.montantTTC,
          tva_r: fc_tva_r(rtn),
          retenue: fc_retenue(rtn),
          decla_id: dec_id,
          client_id
        };
        ops.push(dbQuery('INSERT INTO retenue SET ?', row));
      }
    });

    // Deletes
    req.body.deleteFactureIds.forEach(id => {
      ops.push(dbQuery('DELETE FROM factures WHERE id = ? AND client_id = ?', [id, client_id]));
    });
    req.body.deletePaieIds.forEach(id => {
      ops.push(dbQuery('DELETE FROM paie WHERE id = ? AND client_id = ?', [id, client_id]));
    });
    req.body.deleteRetenueIds.forEach(id => {
      ops.push(dbQuery('DELETE FROM retenue WHERE id = ? AND client_id = ?', [id, client_id]));
    });

    // 4. Run everything
    await Promise.all(ops);

    // 5. Send final response
    return res.status(200).json({ message: 'All database operations completed', saved: true });

  } catch (err) {
    console.error("Database operation failed:", err);
    return res.status(500).json({ message: 'Operation failed', error: err.message, saved: false });
  }
};


  exports.get_dec = async (req, res) => {
    if (req.session.authorized != true) {
      console.error('not authoraised');
      return res.status(500).json({ message: 'not authoraised', del: false});
    }
    console.log("req.body ==> ", req.body);
    const date = req.body.annee+'-'+req.body.mois.toString()+'-00';
    await db.query('SELECT * FROM accounts WHERE email = ?', [req.session.email], (error, results)=>{
      if (error) {
          console.error('Database error:', error);
          return res.status(500).json({ message: 'server error', saved: false });
        }
    
        if (results.length === 0) {
          return res.status(404).json({ message: 'User not found', saved: false });
        }
        const client_id = results[0].id;
        const query = `
        SELECT * FROM declarations
        WHERE client_id = ? AND date = ?
      `;
    
      db.query(query, [client_id, date], (err, results) => {
        if (err) {
          console.error("DB error:", err);
          return res.status(500).json({ message: "Database error", dec: false  });
        }
        console.log("query decla results : ", results);
        //res.json(results);
        if (results.length === 0) {
          return res.status(200).json({ message: 'declaration not found', dec: false, not_found: true });
        }
        const decla_id = results[0].id;
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
            return res.status(500).json({ message: "Database error", dec: false  });
          }
          console.log("query factures results : ", results);
          factures = results;
          db.query(query3, [decla_id], (err, results) => {
            if (err) {
              console.error("DB error:", err);
              return res.status(500).json({ message: "Database error", dec: false  });
            }
            console.log("query paie results : ", results);
            paie = results;
            db.query(query4, [decla_id], (err, results) => {
              if (err) {
                console.error("DB error:", err);
                return res.status(500).json({ message: "Database error", dec: false  });
              }
              console.log("query retenue results : ", results);
              retenue = results;
              const send_data = {factures, paie, retenue};
              return res.json({send_data, dec: true});
            });
          });
        });
      });
    });
  };