const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  profession: String,
  district: String,
  company: String,
  dob: Date,
  age: Number,
  refNumber: String,
  photo: String
});

module.exports = mongoose.model('Member', memberSchema);
