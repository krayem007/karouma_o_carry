exports.welcome = async (req, res) => {
    if (req.session.authorized == true)
    {
        res.json({"authorized" : "true" })
    }
    else
    {
        res.json({"authorized" : "false" })
    }
};
