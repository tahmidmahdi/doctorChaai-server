const mongoose = require('mongoose');

const doctorAppointmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  doctorDetails: {
    doctorID: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
    },
  },
  schedule: {
    date: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = doctorAppointmentSchema;
