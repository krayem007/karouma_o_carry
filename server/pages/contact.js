const nodemailer = require('nodemailer');

exports.send_email = async (req, res) => {
  const { name, email, objet, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Tous les champs obligatoires doivent être remplis" });
  }

  // Expression régulière simple pour valider l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Format d'email invalide" });
  }

  // Configuration de Nodemailer avec les variables d'environnement
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Options de l'email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `Nouveau message de contact: ${objet || 'Sans objet'}`,
    text: `Vous avez reçu un nouveau message de contact:\n\nNom: ${name}\nEmail: ${email}\nObjet: ${objet || 'Non spécifié'}\nMessage:\n${message}`,
    html: `<h3>Vous avez reçu un nouveau message de contact :</h3>
           <ul>
             <li><strong>Nom :</strong> ${name}</li>
             <li><strong>Email :</strong> ${email}</li>
             <li><strong>Objet :</strong> ${objet || 'Non spécifié'}</li>
           </ul>
           <h4>Message :</h4>
           <p>${message.replace(/\n/g, '<br>')}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ success: false, message: "Error sending email" });
  }
};
