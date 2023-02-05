const router = require('express').Router();

const verfiy = require('./verifyToken');


router.post('/', verfiy, async (req, res) => {

    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('Accress Denied');
    }

    //console.log(token);

    res.header('auth-token', "");
    res.send({ msg: "Logged OUT" });

})

module.exports = router;