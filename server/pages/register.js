const dotenv = require('dotenv');
const mysql = require("mysql2");
const bcrypt = require('bcryptjs');

dotenv.config({path: '../.env'});

const db = mysql.createConnection({
    host: process.env.db_host,
    user : process.env.db_user,
    password: process.env.db_password,
    database: process.env.db
});



exports.save = async (req, res) => {
    console.log(req.body);
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
            details_regime} = req.body;
            if (nombre_filial > 0)
                console.log("k");
            else
                nombre_filial = 0;

    db.query('SELECT email FROM accounts WHERE email = ?', [email], async (error, results)=>{
        console.log('query error: '+ error);
        console.log('query results: '+ results);
        if(error)
        {
            console.log("couldn't check if the email already in use : ", error);
        }
        else if (results.length > 0) {
            console.log("that email is already in use");
            return res;
        }
        else{
            let hashedPassword = await bcrypt.hash(password, 12);
            console.log(hashedPassword)
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
                details_regime: details_regime}, (error, results) => {
                    if(error)
                    {
                        console.log("couldn,t save the user in the data base : ", error);
                    }else{
                        console.log("user registered : ", results);
                        return res;
                    }
                })
        }
    })
    return res;
};