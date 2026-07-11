const bcrypt = require('bcrypt');
const db = require('../db');

exports.change_my_account_data = (req, res) => {
  console.log(req.body);
  if (req.session.authorized != true) {
    console.error('not authoraised');
    return res.status(500).json({ error: 'not authoraised' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email requis', update: false });
  }

  const updatableFields = [
    'code_acte', 'identifiant_fiscal', 'identifiant_tva',
    'code_categorie', 'nombre_filiale', 'raison_sociale',
    'address', 'code_postal', 'activite',
    'nature_entite', 'details_regime', 'secteur'
  ];

  const setClauses = [];
  const values = [];

  updatableFields.forEach(field => {
    if (req.body[field] !== undefined && req.body[field] !== null && req.body[field] !== '') {
      setClauses.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  });

  if (req.body.activite_date !== undefined) {
    setClauses.push('activite_date = ?');
    values.push(req.body.activite_date || new Date().toISOString().split('T')[0]);
  }

  if (setClauses.length === 0) {
    return res.status(400).json({ error: 'Aucun champ à mettre à jour', update: false });
  }

  values.push(email);
  const sql = `UPDATE accounts SET ${setClauses.join(', ')} WHERE email = ?`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating client:', err);
      return res.status(500).json({ error: 'Database error', update: false });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client not found', update: false });
    }
    res.json({
      message: 'Client updated successfully',
      update: true
    });
  });
};



exports.change_password = (req, res) => {
  if (req.session.authorized != true) {
    console.error('not authoraised');
    return res.status(500).json({ error: 'not authoraised', pssdate: false });
  }
  console.log(req.body);

  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Email, oldPassword and newPassword are required.', pssdate: false });
  }

  if (newPassword.length < 6 || newPassword.length > 128) {
    return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir entre 6 et 128 caractères', pssdate: false });
  }

  // Step 1: Get the user's current hashed password
  db.query('SELECT password FROM accounts WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', pssdate: false });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found', pssdate: false });
    }

    const storedHashedPassword = results[0].password;

    // Step 2: Compare old password with stored hashed password
    const isMatch = await bcrypt.compare(oldPassword, storedHashedPassword);

    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect old password', pssdate: false });
    }

    // Step 3: Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Step 4: Update the password
    db.query('UPDATE accounts SET password = ? WHERE email = ?', [hashedNewPassword, email], (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Database error:', updateErr);
        return res.status(500).json({ error: 'Failed to update password', pssdate: false });
      }

      res.json({ message: 'Password updated successfully', pssdate: true });
    });
  });
};

exports.delete_account = async (req, res) => {
  if (req.session.authorized != true) {
    console.error('not authoraised');
    return res.status(500).json({ message: 'not authoraised', del: false });
  }
  const { email, password } = req.body;
  if (password.length === 0) {
    return res.status(200).json({ message: 'Veuillez saisir votre mot de passe actuel', del: false });
  }
  console.log("data : ", req.body);
  console.log("emai | password :", email, password);
  db.query('SELECT password FROM accounts WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Database error:');
      return res.status(500).json({ message: 'Database error', del: false });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found', del: false });
    }

    const storedHashedPassword = results[0].password;

    // Step 2: Compare old password with stored hashed password
    const isMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!isMatch) {
      return res.status(200).json({ message: 'Le mot de passe saisi est incorrect.', del: false });
    }
    else {
      const sql = 'DELETE FROM accounts WHERE email = ?';
      db.query(sql, [email], (err, result) => {
        if (err) {
          console.error('Error deleting user:', err);
          return res.status(500).json({ message: 'Internal server error', del: false });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found', del: false });
        }

        res.json({ message: 'User deleted successfully', del: true });
      });
    }
  });
};