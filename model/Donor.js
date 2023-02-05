const number = require("@hapi/joi/lib/types/number");
const mongoose = require("mongoose");

var SchemaTypes = mongoose.Schema.Types;


/*

{
  "name":"Pratham Bumb",
  "gender":"M",
  "dob":"11-03-2003",
  "phone":"7066176352",
  "email":"pratham.bumb@gmail.com",
  "bloodGroup":"A+",
  "city":"Nasihk",
  "state":"Maharastra",
  "zip": "422011",
  "medical":"NO",
  "specify":"0"
}


*/
const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  medical: {
    type: String,
    required: true,
  },
  specify: {
    type: String,
    required: true,
  }

});

module.exports = mongoose.model("Donor", donorSchema);
