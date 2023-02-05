var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("bdms");

    var datetime = new Date();


    var myquery = { "_id": ObjectId("63de3e355b85992752c25062") };
    var newvalues = { $set: { verfied: 1, date: datetime } };
    dbo.collection("donors").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });

});