const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Accress Denied');

    try{

        const verified = jwt.verify(token,"dsjgfyyigvbu5");
        req.user = verified;
        next();
    }catch{

        res.status(400).send({msg:"Invaide Token"});

    }
}