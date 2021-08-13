const express = require ('express');
const router = express.Router();
const mongoose = require ('mongoose');
const doctorAppointmentSchema = require ('../schemas/doctorAppointmentSchema');
const doctorAppointment = new mongoose.model('doctorAppointment', doctorAppointmentSchema);
const loginGuard = require ('../middlewares/loginGuard')
router.get('/', loginGuard, async (req, res) => {

    try {
        const appointment = await doctorAppointment.find({})

        res.status(200).json({
            result: appointment,
            status: true

        })
    }
    catch(err) {
        res.status(500).json({
            error: "There was a server side error!",
            status: false
        })
    }
})


router.post('/doctorAppointment',loginGuard, async (req, res) => {

    try {
        const doctorAppointments = await new doctorAppointment(req.body)
        doctorAppointments.save();

        res.status(200).json({
            message: "Successfully appointment taken",
            status: true
        })
    }
    catch (err) {
        res.status(500).json({
            error: 'There was a server side error',
            status: false
        });
    }
})

module.exports = router;