const mongoose = require('mongoose');

const doctorAppointmentSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },

    phoneNumber: {
        type: Number,
        require: true
    },

    department : {
        type: String,
        require: true
    },
    
    date: {
        type: Date,
        default:  Date.now
    }
})

module.exports = doctorAppointmentSchema;