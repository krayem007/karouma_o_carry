
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

const isProd = process.env.NODE_ENV === 'production';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const API_ORIGIN = process.env.API_ORIGIN || 'http://localhost:5002';

app.set('trust proxy', 1);

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
            scriptSrc: ["'self'", "https://unpkg.com", "https://cdnjs.cloudflare.com"].concat(isProd ? [] : ["'unsafe-inline'", "'unsafe-eval'"]),
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'", FRONTEND_URL, API_ORIGIN],
            formAction: ["'self'"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

// Enable CORS to allow requests from the React frontend
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
  }));

const authLimiter = process.env.SKIP_RATE_LIMIT
  ? (req, res, next) => { if (!isProd) console.log('[RATE LIMIT] SKIPPED'); next(); }
  : rateLimit({
      windowMs: 3 * 60 * 1000,
      max: 10,
      message: { error: true, message: "Trop de tentatives. Réessayez dans 3 minutes." },
      standardHeaders: true,
      legacyHeaders: false,
    });

const printLimiter = process.env.SKIP_RATE_LIMIT
  ? (req, res, next) => { if (!isProd) console.log('[RATE LIMIT] SKIPPED'); next(); }
  : rateLimit({
      windowMs: 60 * 1000,
      max: 20,
      message: { error: true, message: "Trop de demandes d'impression. Réessayez dans une minute." },
      standardHeaders: true,
      legacyHeaders: false,
    });

const contactLimiter = process.env.SKIP_RATE_LIMIT
  ? (req, res, next) => { if (!isProd) console.log('[RATE LIMIT] SKIPPED'); next(); }
  : rateLimit({
      windowMs: 60 * 60 * 1000,
      max: 5,
      message: { error: true, message: "Trop de messages envoyés. Réessayez dans une heure." },
      standardHeaders: true,
      legacyHeaders: false,
    });

app.use(express.json({ limit: '5mb' }));

// Session middleware to manage user sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      secure: isProd,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 8 * 60 * 60 * 1000,
    },
  }));


app.post("/register", authLimiter, require('./pages/register').save)
app.post("/login", authLimiter, require('./pages/login').logging)
app.get("/welcome", require('./pages/welcome').welcome)
app.post("/logout", require('./pages/logout').logout)
app.post("/my_account_data", require('./pages/my_account').change_my_account_data)
app.post("/spiderPUSS", require('./pages/my_account').change_password)
app.post("/delete_account", require('./pages/my_account').delete_account)
app.post("/update_language", require('./pages/my_account').update_language)
app.post("/delete_declarations", require('./pages/dec').delete_declarations)
app.post("/dec", require('./pages/dec').post_dec)
app.post("/get_dec", require('./pages/dec').get_dec)
app.post("/calculate_net", require('./pages/dec').calculate_net)
app.post("/contact", contactLimiter, require('./pages/contact').send_email)
app.get("/summary", require('./pages/summary').welcome)
app.post("/print_doc", printLimiter, require('./pages/summary').print_doc)
app.post("/request_reset", authLimiter, require('./pages/reset_password').request_reset)
app.post("/apply_reset", authLimiter, require('./pages/reset_password').apply_reset)
app.post("/verify_reset_token", require('./pages/reset_password').verify_token)

// JSON 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (res.headersSent) return next(err);
  res.status(500).json({ message: "Internal server error" });
});

const port = process.env.PORT || 5002;
const server = app.listen(port, () => {
  console.log(`server started on port ${port}`);
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