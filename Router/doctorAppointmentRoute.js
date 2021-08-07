const express = require ('express');
const router = express.Router();
const mongoose = require ('mongoose');
const doctorAppointmentSchema = require ('../schemas/doctorAppointmentSchema');
const doctorAppointment = new mongoose.model('doctorAppointment', doctorAppointmentSchema);

router.get('/', async (req, res) => {

    try {
        const appointment = await doctorAppointment.find({})

        res.status(200).json({
            result: appointment

        })
    }
    catch(err) {
        res.status(500).json({
            error: "There was a server side error!",
        })
    }
})


router.post('/doctorAppointment', async (req, res) => {

    try {
        const doctorAppointment = await new doctorAppointment(req.body)
        doctorAppointment.save();

        res.status(200).json({
            message: "Successfully appointment taken"
        })
    }
    catch (err) {
        res.status(500).json( {
            error: 'There was a server side error'
        });
    }
})

module.exports = router;