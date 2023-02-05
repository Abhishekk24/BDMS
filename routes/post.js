const router = require('express').Router();
const Donor = require('../model/Donor');
const Stove = require('../model/Stove');
const verfiy = require('./verifyToken');
const User = require('../model/User');

router.get('/', verfiy, (req, res) => {
    res.json({
        posts: {
            title: "test",
            discription: "hello this is test"
        }
    })
})



router.post('/addData', verfiy, async (req, res) => {



    const stove = new Stove({

        serialNo: req.body.serialNo,
        stoveNo: req.body.stoveNo,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        date: req.body.date,
        time: req.body.time,
        startTemp: req.body.startTemp,
        stopTemp: req.body.stopTemp,
        workingHour: req.body.workingHour,
        emission: req.body.emission,
        status: req.body.status



    });

    try {
        const savedStove = await stove.save();
        res.send({ stove: savedStove._id });

    } catch (err) {
        res.sendStatus(400).send(err);
    }


});



router.get('/getDonation', verfiy, async (req, res) => {



    try {

        const userId = req.header.userId
        console.log(userId);

        var query = { 'question' : req.params.id };
     console.log(query);
     console.log('query');

    db.collection('english', function(err, collection) {

        collection.findOne(query, function(err, item) {
            console.log(err);
            res.send(item);
        });
    });
        res.json(data)
    } catch (err) {
        res.sendStatus(400).send(err);
    }


});









module.exports = router;