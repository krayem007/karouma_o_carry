
const express = require ("express");
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const cors = require("cors");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

dotenv.config({path: '.env'});

if (!process.env.SESSION_SECRET) {
    console.error("SESSION_SECRET n'est pas défini dans .env");
    process.exit(1);
}

app.disable('x-powered-by');

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'", "http://localhost:5002", "http://localhost:3000"],
            formAction: ["'self'"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

// Enable CORS to allow requests from the React frontend
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

const authLimiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 50,
    message: { error: true, message: "Trop de tentatives. Réessayez dans 3 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(express.json());

// Session middleware to manage user sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: "lax",
    },
  }));
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

app.post("/register", authLimiter, require('./pages/register').save)
app.post("/login", authLimiter, require('./pages/login').logging)
app.get("/welcome", require('./pages/welcome').welcome)
app.post("/logout", require('./pages/logout').logout)
app.post("/my_account_data", require('./pages/my_account').change_my_account_data)
app.post("/spiderPUSS", require('./pages/my_account').change_password)
app.post("/delete_account", require('./pages/my_account').delete_account)
app.post("/delete_declarations", require('./pages/dec').delete_declarations)
app.post("/dec", require('./pages/dec').post_dec)
app.post("/get_dec", require('./pages/dec').get_dec)
app.post("/calculate_net", require('./pages/dec').calculate_net)
app.post("/contact", require('./pages/contact').send_email)
app.get("/summary", require('./pages/summary').welcome)
app.post("/print_doc", require('./pages/summary').print_doc)
app.post("/request_reset", authLimiter, require('./pages/reset_password').request_reset)
app.post("/apply_reset", authLimiter, require('./pages/reset_password').apply_reset)
app.get("/verify_reset_token/:token", require('./pages/reset_password').verify_token)

const port = 5002;
app.listen(port, ()=> {console.log("server started on port 5002")})