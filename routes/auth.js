const router = require('express').Router();
const User = require('../model/User');
//const  Donor = require('../model/Donor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation } = require('../validation');


const { loginValidation } = require('../validation');
const Donor = require('../model/Donor');
const verfiy = require('./verifyToken');
const { func } = require('@hapi/joi');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017/bdms";
const client = new MongoClient(uri, { useNewUrlParser: true });

router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body);
    console.log(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const checkEmail = await User.findOne({ email: req.body.email });



    if (checkEmail) return res.status(400).send('Email Already Exists');

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const user = new User({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPass

    });

    try {
        const savedUser = await user.save();
        res.send({ user: user._id });

    } catch (err) {
        res.sendStatus(400).send(err);
    }


});






router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body);
    //console.log("DBUG"+error);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is not found');
    const validaPass = await bcrypt.compare(req.body.password, user.password);
    if (!validaPass) return res.status(400).send('Password is wrong');
    const token = jwt.sign({ _id: user._id }, "dsjgfyyigvbu5");
    res.header('auth-token', token);
    res.header('userId', user._id);
    res.send({ msg: "Logged IN", _id: user._id, token: token });

});


router.post('/addDonor', verfiy, async (req, res) => {

    const donor = new Donor({

        name: req.body.name,
        gender: req.body.gender,
        dob: req.body.dob,
        phone: req.body.phone,
        email: req.body.email,
        bloodGroup: req.body.bloodGroup,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        medical: req.body.medical,
        specify: req.body.specify,


    });

    try {
        const savedDonor = await donor.save();
        res.send({ gen: savedDonor._id });

    } catch (err) {
        res.sendStatus(400).send(err);
    }



});



router.post('/getUserDonation', verfiy, async (req, res) => {



    try {

        const userId = req.headers.userid
        const userData = await User.findById(userId);
        const email_my = userData.email

        console.log(email_my);
        //const records = await Donor.find({ $and: [{ verfied: 1 }] }).where('email').in(email_my).exec();
        //const records = await Donor.find({ verfied: 1 }).exec();

        client.connect(err => {
            const email = email_my;
            const db = client.db("bdms");
            const collection = db.collection("donors");
            var credit = 0
            collection.find({ email: email, verfied: 1 }).toArray(function (err, result) {
                console.log(result.length);
                credit = (result.length) * 5
                res.send({ result, "credit": credit });

                client.close();

            });


        });




    } catch (err) {
        res.sendStatus(400).send(err);
    }


});



router.get('/getDonation', async (req, res) => {



    try {

        client.connect(err => {
            const db = client.db("bdms");
            const collection = db.collection("donors");
            collection.find({ verfied: 1 }).toArray(function (err, result) {
                console.log(result.length);
                const count = result.length
                res.send({ count });
                client.close();

            });


        });




    } catch (err) {
        res.sendStatus(400).send(err);
    }


});



module.exports = router;