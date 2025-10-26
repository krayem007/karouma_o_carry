
const express = require ("express");
const mysql = require("mysql");
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const cors = require("cors");

const app = express();

// Enable CORS to allow requests from the React frontend
app.use(cors({
    origin: 'http://localhost:3000', // URL of the React frontend
    credentials: true, // Allow cookies to be sent with cross-origin requests
  }));

app.use(express.json());

// Session middleware to manage user sessions
app.use(session({
    secret: 'your-secret-key', // Secret used to sign the session ID cookie
    resave: false, // Avoid resaving the session if it hasn't been modified
    saveUninitialized: false, // Prevent saving uninitialized sessions
    cookie: {
      secure: false, // Set to `true` in production for HTTPS only
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    },
  }));

dotenv.config({path: '.env'});
const db = mysql.createConnection({
    host: process.env.db_host,
    user : process.env.db_user,
    password: process.env.db_password,
    database: process.env.db
});
db.connect( (error) => {
    if(error){
        console.log("mysql connection error :",error)
    }
    else{
        console.log("MYSQL Connected...")
    }
})

app.post("/register", require('./pages/register').save)
app.post("/login", require('./pages/login').logging)
app.get("/welcome", require('./pages/welcome').welcome)
app.post("/logout", require('./pages/logout').logout)
app.post("/my_account_data", require('./pages/my_account').change_my_account_data)
app.post("/spiderPUSS", require('./pages/my_account').change_password)
app.post("/delete_account", require('./pages/my_account').delete_account)
app.post("/dec", require('./pages/dec').post_dec)
app.post("/get_dec", require('./pages/dec').get_dec)
app.get("/summary", require('./pages/summary').welcome)
app.post("/print_doc", require('./pages/summary').print_doc)

const port = 5002;
app.listen(port, ()=> {console.log("server started on port 5002")})