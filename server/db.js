const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({ path: '.env' });
const useCA = process.env.DB_SSL_CA && fs.existsSync(process.env.DB_SSL_CA);
module.exports = mysql.createPool({
  host: process.env.db_host,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db,
  dateStrings: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 30000,
  ssl: useCA
    ? { ca: fs.readFileSync(process.env.DB_SSL_CA), rejectUnauthorized: true }
    : { rejectUnauthorized: false },
});
