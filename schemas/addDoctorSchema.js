// require
const mongoose = require('mongoose');

const addDoctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },

  education: {
    type: String,
    required: true,
  },

  specialization: {
    type: String,
    required: true,
  },

  consultation: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['approved', 'pending', 'rejected'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = addDoctorSchema;
