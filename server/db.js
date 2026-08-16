const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
module.exports = mysql.createPool({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db,
  dateStrings: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false,
  },
});
