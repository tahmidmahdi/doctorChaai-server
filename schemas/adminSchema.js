const mongoose = require('mongoose');


// defining schema

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = adminSchema;