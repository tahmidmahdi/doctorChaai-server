// require
const mongoose = require('mongoose');

const addDoctorSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    phone:{
        type: Number, 
        required: true
    },
    address : {
        type: String, 
        required: true
    },
    experience : {
        type: String, 
        required: true,
    },
    about : {
        type: String, 
        required: true
    },
    photo : {
        type: String, 
        required: true,
    },

    education : {
        type: String, 
        required: true
    }, 

    specialization : {
        type: String, 
        required: true
    },

    consultation : {
        type: Number, 
        required: true
    }, 

    date: {
        type: Date,
        default: Date.now,
    }

}); 

module.exports = addDoctorSchema;