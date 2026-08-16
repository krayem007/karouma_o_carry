const bcrypt = require('bcrypt');
const db = require('../db');

exports.logging = async (req, res) => {
    const { password, email} = req.body;
    if (!email || !password) {
        return res.status(200).json({ message: 'Identifiants incorrects', status: 'error' });
    }
    db.query('SELECT id, email, password, raison_sociale, activite_date, code_acte, identifiant_fiscal, identifiant_tva, code_categorie, nombre_filiale, address, code_postal, activite, nature_entite, details_regime, secteur, language FROM accounts WHERE email = ?', [email], (error, results)=>{
        if(error)
         {
            console.error(error);
            return res.status(500).json({ message: 'Database error', status: 'error' });
         }
         else if (results.length > 0) 
         {
            const account = results[0];
            bcrypt.compare(password, account.password, function(err, result) {
            if (result == true)
            {
                req.session.regenerate((regErr) => {
                    if (regErr) {
                        console.error(regErr);
                        return res.status(500).json({ message: 'Database error', status: 'error' });
                    }
                    req.session.user = account.id;
                    req.session.email = account.email;
                    req.session.authorized = true;
                    const user_data = { ...account };
                    user_data.password = undefined;
                    res.status(200).json({
                        message: `logging Success`,
                        status: 'success',
                        user : account.raison_sociale,
                        user_data : user_data});
                });
            }
            else{
                res.status(200).json({
                    message: 'Identifiants incorrects',
                    status: 'error',});
            }
            });
         }
         else 
         {
            res.status(200).json({
                message: 'Identifiants incorrects',
                status: 'error',});
         }
     })
};
