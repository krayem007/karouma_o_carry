const bcrypt = require('bcrypt');
const db = require('../db');

exports.logging = async (req, res) => {
    console.log(req.body);
    const { password, email} = req.body;
    db.query('SELECT * FROM accounts WHERE email = ?', [email], (error, results)=>{
        if(error)
         {
            console.log(error);
            return res.status(500).json({ message: 'Database error', status: 'error' });
         }
         else if (results.length > 0) 
         {
            const bassbass = results[0].password;
            bcrypt.compare(password, bassbass, function(err, result) {
            if (result == true)
            {
                results[0].password = "wild il ba3";
                req.session.user = results[0].id;
                req.session.email = email;
                req.session.authorized = true;
                console.log("logging success");
                res.status(200).json({
                    message: `logging Success`,  // Success message
                    status: 'success',
                    user : results[0].raison_sociale,
                    user_data : results[0]});
                return results[0].id;
            }
            else{
                console.log('test1');
                console.log("password error")
                res.status(200).json({
                    message: 'password error',
                    status: 'error',});
                return -1;
            }
            });
         }
         else 
         {
            console.log("This email doesn't exist")
            res.status(200).json({
                message: 'This email doesn\'t exist',
                status: 'error',});
            return -2;
         }
     })
};