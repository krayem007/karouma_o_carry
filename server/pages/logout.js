exports.logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
          return res.status(500).json({ message: 'Could not log out.' });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: 'Déconnecté avec succès.' });
    });
};