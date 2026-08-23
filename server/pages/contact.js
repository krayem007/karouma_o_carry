const { sendEmail } = require('../utils/email');

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

exports.send_email = async (req, res) => {
  const { name, email, objet, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Tous les champs obligatoires doivent être remplis" });
  }

  if (name.length > 100 || email.length > 254 || (objet && objet.length > 200) || message.length > 2000) {
    return res.status(400).json({ success: false, message: "Un ou plusieurs champs dépassent la longueur maximale autorisée" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Format d'email invalide" });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeObjet = escapeHtml(objet || 'Non spécifié');
  const safeMessage = escapeHtml(message || '');

  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Nouveau message de contact: ${safeObjet}`,
      text: `Vous avez reçu un nouveau message de contact:\n\nNom: ${name}\nEmail: ${email}\nObjet: ${objet || 'Non spécifié'}\nMessage:\n${message}`,
      html: `<h3>Vous avez reçu un nouveau message de contact :</h3>
             <ul>
               <li><strong>Nom :</strong> ${safeName}</li>
               <li><strong>Email :</strong> ${safeEmail}</li>
               <li><strong>Objet :</strong> ${safeObjet}</li>
             </ul>
             <h4>Message :</h4>
             <p>${safeMessage.replace(/\n/g, '<br>')}</p>`
    });
    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("Error sending email:", error.code || error.message || error);
    return res.status(500).json({ success: false, message: "Error sending email" });
  }
};
