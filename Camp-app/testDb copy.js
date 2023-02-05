const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";

app.use(bodyParser.json());


app.post("/verfiy", (req, res) => {
  const { _id } = req.body;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("bdms");

    var datetime = new Date();


    var myquery = { "_id": ObjectId(_id) };
    var newvalues = { $set: { verfied: 1, date: datetime } };
    dbo.collection("donors").updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      //console.log("1 document updated");
      db.close();

    });

    res.send({ "status": "updated" });

  });




});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});
