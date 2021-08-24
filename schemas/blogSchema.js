const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = blogSchema;
