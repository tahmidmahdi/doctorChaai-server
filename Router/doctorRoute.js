// require
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const addDoctorSchema = require('../schemas/addDoctorSchema');
const loginGuard = require('../middlewares/loginGuard')
// use

const addDoctor = new mongoose.model('addDoctor', addDoctorSchema);

// add a doctor 

router.get('/',loginGuard , async(req, res) => {
    try{
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

router.get('/allDoctors', async(req, res) => {
    try{
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

router.post('/addDoctor', async(req, res) => {
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

router.get('/searchDoctor/:name',loginGuard, async (req, res) => {
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

router.put('/update/:id', loginGuard , async(req, res) => {
   await addDoctor.findByIdAndUpdate(
       {_id: req.params.id},
       {
           $set: {
               status: req.headers.status
           },
       }, 
       {
            useFindAndModify:false
       },
       (err) => {
           if(err) {
               res.status(500).json({
                       error: "There was a server side error!"
               })
           } else{
               res.status(200).json({
                   message: "Doctor was update successfully"
               })
           }
       }
   )
})



module.exports = router;

