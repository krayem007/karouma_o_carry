
const express = require ("express");
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

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

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

const authLimiter = process.env.SKIP_RATE_LIMIT
  ? (req, res, next) => { if (process.env.NODE_ENV !== 'production') console.log('[RATE LIMIT] SKIPPED'); next(); }
  : rateLimit({
      windowMs: 3 * 60 * 1000,
      max: 10,
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
const server = app.listen(port, () => {
  console.log("server started on port 5002");
  const pool = require('./puppeteer-pool')();
  pool.initialize().catch(err => console.error("[POOL] Init error:", err));
});
server.timeout = 120000;

async function gracefulShutdown(signal) {
  console.log(`\n[APP] ${signal} received, shutting down...`);
  server.close(() => {
    console.log("[APP] HTTP server closed");
  });
  try {
    const pool = require('./puppeteer-pool')();
    await pool.shutdown();
  } catch (e) {
    console.error("[APP] Pool shutdown error:", e);
  }
  process.exit(0);
}
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));