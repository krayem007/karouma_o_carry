const { google } = require('googleapis');

let oauth2Client = null;

function getClient() {
  if (oauth2Client) return oauth2Client;
  oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });
  return oauth2Client;
}

function buildRawEmail({ from, to, subject, text, html }) {
  const boundary = 'boundary_' + Date.now();
  const parts = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    '',
    text,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    '',
    html,
    '',
    `--${boundary}--`,
  ];
  return Buffer.from(parts.join('\r\n')).toString('base64url');
}

async function sendEmail({ to, subject, text, html }) {
  const gmail = google.gmail({ version: 'v1', auth: getClient() });
  const raw = buildRawEmail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });
  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw },
  });
}

module.exports = { sendEmail };
