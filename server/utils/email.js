const nodemailer = require('nodemailer');
const dns = require('dns').promises;

let cachedTransporter = null;
let cachedHost = null;

async function getTransporter() {
  const ipv4 = (await dns.resolve4('smtp.gmail.com'))[0];
  if (cachedTransporter && cachedHost === ipv4) return cachedTransporter;

  cachedHost = ipv4;
  cachedTransporter = nodemailer.createTransport({
    host: ipv4,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: { servername: 'smtp.gmail.com' },
    connectionTimeout: 10000,
    socketTimeout: 10000,
  });

  return cachedTransporter;
}

module.exports = { getTransporter };
