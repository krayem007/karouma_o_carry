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

exports.logging = async (req, res) => {
    console.log(req.body);
    const { password, email} = req.body;
    let ret = db.query('SELECT * FROM accounts WHERE email = ?', [email], (error, results)=>{
        if(error)
         {
            console.log(error);
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
         console.log("shouldn't be here")
     })

    /*res.status(400).json({
        message: 'server error!!',
        status: 'error',});
    return -3;*/

};