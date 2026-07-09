const dotenv = require('dotenv');
const mysql = require("mysql2");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

dotenv.config({ path: '../.env' });

const db = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db
});

exports.request_reset = async (req, res) => {
  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email.trim())) {
    return res.status(400).json({ error: "Format d'email invalide." });
  }

  // 1. Check if email exists
  db.query('SELECT * FROM accounts WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: "Erreur serveur." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Cette adresse e-mail n'est pas associée à un compte." });
    }

    const user = results[0];

    // 2. Vérifier s'il y a un token valide ou en générer un nouveau
    let token;
    let expiry;
    let needsUpdate = true;

    if (user.reset_token && user.reset_token_expiry && Date.now() < user.reset_token_expiry) {
      // Réutiliser le token existant
      token = user.reset_token;
      expiry = user.reset_token_expiry;
      needsUpdate = false;
    } else {
      // Générer un nouveau token
      token = crypto.randomBytes(32).toString('hex');
      expiry = Date.now() + 3600000; // 1 heure à partir de maintenant
    }

    const sendEmail = async () => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const resetLink = `http://localhost:3000/reset-password/${token}`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Réinitialisation de votre mot de passe`,
        text: `Vous avez demandé à réinitialiser votre mot de passe.\n\nCliquez sur ce lien pour choisir un nouveau mot de passe : ${resetLink}\n\nCe lien expirera dans 1 heure.`,
        html: `<h3>Réinitialisation de mot de passe</h3>
               <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
               <p><a href="${resetLink}">Cliquez ici pour choisir un nouveau mot de passe</a></p>
               <p>Ce lien expirera dans 1 heure.</p>
               <br>
               <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.</p>`
      };

      try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "E-mail de réinitialisation envoyé avec succès." });
      } catch (emailErr) {
        console.error("Error sending email:", emailErr);
        return res.status(500).json({ error: "Erreur lors de l'envoi de l'e-mail." });
      }
    };

    if (needsUpdate) {
      // Sauvegarder le nouveau token dans la base de données
      db.query('UPDATE accounts SET reset_token = ?, reset_token_expiry = ? WHERE email = ?', [token, expiry, email], async (updateErr) => {
        if (updateErr) {
          console.error('Error saving reset token:', updateErr);
          return res.status(500).json({ error: "Erreur serveur." });
        }
        await sendEmail();
      });
    } else {
      // Envoyer l'email directement avec le token existant
      await sendEmail();
    }
  });
};

exports.apply_reset = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: "Token et nouveau mot de passe requis.", update: false });
  }

  if (newPassword.length < 6 || newPassword.length > 128) {
    return res.status(400).json({ error: "Le mot de passe doit contenir entre 6 et 128 caractères", update: false });
  }

  // 1. Find user by token and check expiry
  db.query('SELECT * FROM accounts WHERE reset_token = ?', [token], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: "Erreur serveur.", update: false });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "Lien de réinitialisation invalide.", update: false });
    }

    const user = results[0];

    if (Date.now() > user.reset_token_expiry) {
      return res.status(400).json({ error: "Le lien de réinitialisation a expiré.", update: false });
    }

    // 2. Hash new password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(newPassword, 12); // Using same salt rounds as register.js
    } catch (hashErr) {
      console.error('Hash error:', hashErr);
      return res.status(500).json({ error: "Erreur lors du hachage du mot de passe.", update: false });
    }

    // 3. Update password and clear token fields
    db.query('UPDATE accounts SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?', [hashedPassword, user.id], (updateErr) => {
      if (updateErr) {
        console.error('Database error:', updateErr);
        return res.status(500).json({ error: "Erreur lors de la mise à jour du mot de passe.", update: false });
      }

      res.status(200).json({ message: "Mot de passe mis à jour avec succès.", update: true });
    });
  });
};

exports.verify_token = async (req, res) => {
  const { token } = req.params;

  db.query('SELECT * FROM accounts WHERE reset_token = ?', [token], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: "Erreur serveur.", valid: false });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Lien de réinitialisation invalide.", valid: false });
    }

    const user = results[0];

    if (Date.now() > user.reset_token_expiry) {
      return res.status(400).json({ error: "Le lien de réinitialisation a expiré.", valid: false });
    }

    res.status(200).json({ message: "Token valide.", valid: true });
  });
};
