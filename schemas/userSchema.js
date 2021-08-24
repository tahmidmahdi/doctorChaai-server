const mongoose = require("mongoose");
const  { isEmail, isStrongPassword }   = require("validator")
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    lowercase: true,
    validate: [isEmail,  "Please enter an valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = userSchema;
