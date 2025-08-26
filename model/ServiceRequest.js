const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
   type:mongoose.Schema.Types.ObjectId,
           ref:"Member",
           required:true
  },
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);