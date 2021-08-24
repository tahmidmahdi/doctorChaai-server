const mongoose = require('mongoose');

const doctorAppointmentSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    department : {
        type: String,
        required: true
    },
    doctor : {
        type: String,
        required: true
    },
    
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = doctorAppointmentSchema;