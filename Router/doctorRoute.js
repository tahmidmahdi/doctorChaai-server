// require
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const addDoctorSchema = require('../schemas/addDoctorSchema');
const loginGuard = require('../middlewares/loginGuard')
// use

const addDoctor = new mongoose.model('addDoctor', addDoctorSchema);

// add a doctor 

router.get('/', loginGuard, async(req, res) => {
    try{
        console.log(req.userId);
        console.log(req.username);
        const doctor = await addDoctor.find({})
            .select({
                date: 0
            })
        res.status(200).json({
            result: doctor,
            message: "success"

        })
    } catch(err) {
        res.status(500).json({
            error: "There was a server side error!",
        })
    }
}); 


// post a doctor 

router.post('/addDoctor', loginGuard,  async(req, res) => {
    try{
        const newDoctor = await new addDoctor(req.body);
        newDoctor.save();
        res.status(200).json({
            message: 'Successfully inserted a doctor'
        })
    }catch(err){
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
})

router.get('/searchDoctor/:name', async (req, res) => {
    try{
        const params = req.params.name;
        const doctor = await  addDoctor.find({name: {$regex:params, $options:"i"}})
        res.status(200).json({
            result: doctor,
            message: "success"

        })
    }catch{
        res.status(500).json({
            error: "There was a server side error!",
        })
    }
})

module.exports = router;

