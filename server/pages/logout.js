exports.logout = async (req, res) => {
    console.log("logout func : ",req.body);
    req.session.authorized = false;
    console.log("authorized : ", req.session.authorized);
    req.session.destroy(err => {
        if (err) {
          return res.status(500).send('Could not log out.');
        }
        res.clearCookie('connect.sid'); // name of the session ID cookie
      });
};