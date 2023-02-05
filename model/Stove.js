const number = require("@hapi/joi/lib/types/number");
const mongoose = require("mongoose");

var SchemaTypes = mongoose.Schema.Types;

const stoveSchema = new mongoose.Schema({
  serialNo: {
    type: Number,
    required: true,
  },

  stoveNo: {
    type: String,
    required: true,
  },

  latitude: {
    type: String,
    required: true,
  },

  longitude: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },

  startTemp: {
    type: Number,
    required: true,
  },
  stopTemp: {
    type: Number,
    required: true,
  },
  workingHour: {
    type: Number,
    required: true,
  },

  emission: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
  // // emission :{
  // //     type:number,
  // //     required:true

  // // },
  // status :{
  //     type:number,
  //     required:true

  // }
});

module.exports = mongoose.model("Stove", stoveSchema);
