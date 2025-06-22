exports.welcome = async (req, res) => {
    console.log("welcom func : ",req.body);
    
    if (req.session.authorized == true)
    {
        res.json({"authorized" : "true" })
    }
    else
    {
        res.json({"authorized" : "false" })
    }
};
