const bcrypt = require('bcrypt');
const db = require('../db');



exports.save = async (req, res) => {
    let { password,
            email, 
            code_acte, 
            identifiant_fiscal,
            identifiant_tva,
            code_categorie,
            nombre_filial,
            nom_prenom_raison,
            adresse,
            code_postal,
            activite,
            cessation_jour,
            cessation_mois,
            cessation_annee,
            nature_entite,
            details_regime,
            secteur,
            language} = req.body;

            if (email) email = email.trim();
            if (nom_prenom_raison) nom_prenom_raison = nom_prenom_raison.trim();
            if (adresse) adresse = adresse.trim();
            if (activite) activite = activite.trim();

            if (!password || password.length < 6 || password.length > 128) {
                console.log("password validation failed");
                return res.json({ error: "register.err_password_length" });
            }

            if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                console.log("email validation failed");
                return res.json({ error: "register.err_email_format" });
            }

            if (!identifiant_fiscal || !/^[0-9A-Z]{8}$/.test(identifiant_fiscal)) {
                console.log("identifiant_fiscal validation failed");
                return res.json({ error: "register.err_identifiant_invalide" });
            }

            if (nombre_filial > 0)
                console.log("k");
            else
                nombre_filial = 0;

    db.query('SELECT email FROM accounts WHERE email = ?', [email], async (error, results)=>{
        if(error)
        {
            console.log("couldn't check if the email already in use : ", error);
            return res.json({ error: "errors.database_error" });
        }
        else if (results.length > 0) {
            console.log("that email is already in use");
            return res.json({ error: "register.err_email_existant" });
        }
        else{
            let hashedPassword;
            try {
                hashedPassword = await bcrypt.hash(password, 10);
            } catch (hashErr) {
                console.error("Password hashing failed:", hashErr);
                return res.json({ error: "register.err_inscription" });
            }
            db.query('INSERT INTO accounts SET ?', {
                code_acte: code_acte,
                identifiant_fiscal: identifiant_fiscal,
                identifiant_tva : identifiant_tva,
                code_categorie :code_categorie, 
                nombre_filiale : nombre_filial,
                raison_sociale : nom_prenom_raison,
                address : adresse, 
                code_postal : code_postal,
                activite : activite,
                activite_date : (cessation_annee ? cessation_annee.toString() : '1970') + '-' + (cessation_mois ? cessation_mois.toString() : '01') + '-' + (cessation_jour ? cessation_jour.toString() : '01'),
                email : email, 
                password : hashedPassword,
                nature_entite: nature_entite,
                details_regime: details_regime,
                secteur: secteur,
                language: (language === 'ar' ? 'ar' : 'fr')}, (error, results) => {
                    if(error)
                    {
                        console.log("couldn,t save the user in the data base : ", error);
                        return res.json({ error: "register.err_inscription" });
                    }else{
                        console.log("user registered : ", results);
                        return res.json({ success: true });
                    }
                })
        }
    })
    return res;
};