const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

app.use(bodyParser.json());
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost/camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", UserSchema);

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  User.create({
    username: username,
    password: hashedPassword
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) return res.status(404).send("User not found");

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) return res.status(401).send("Invalid password");

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ auth: true, token });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
