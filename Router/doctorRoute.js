// require
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const addDoctorSchema = require('../schemas/addDoctorSchema');
const loginGuard = require('../middlewares/loginGuard');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// use

const addDoctor = new mongoose.model('addDoctor', addDoctorSchema);

// add a doctor

router.get('/', loginGuard, async (req, res) => {
  try {
    const doctor = await addDoctor.find({}).select({
      date: 0,
    });
    res.status(200).json({
      result: doctor,
      message: 'success',
    });
  } catch (err) {
    res.status(500).json({
      error: 'There was a server side error!',
    });
  }
});

router.get('/allDoctors', async (req, res) => {
  try {
    const doctor = await addDoctor.find({}).select({
      date: 0,
    });
    res.status(200).json({
      result: doctor,
      message: 'success',
    });
  } catch (err) {
    res.status(500).json({
      error: 'There was a server side error!',
    });
  }
});

// post a doctor

router.post('/addDoctor', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newDoctor = await new addDoctor({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      experience: req.body.experience,
      email: req.body.email,
      password: hashedPassword,
      about: req.body.about,
      photo: req.body.photo,
      education: req.body.education,
      specialization: req.body.specialization,
      consultation: req.body.consultation,
    });
    newDoctor.save();
    res.status(200).json({
      message: 'Successfully inserted a doctor',
    });
  } catch (err) {
    res.status(500).json({
      error: 'There was a server side error!',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const doctorLogin = await addDoctor.find({email: req.body.email});
    if (doctorLogin && doctorLogin.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        doctorLogin[0]?.password
      );

      if (isValidPassword) {
        const token = jwt.sign(
          {
            email: doctorLogin[0].email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );
        res.status(200).json({
          access_token: token,
          message: 'Login is successful',
          status: true,
          isDoctor: true,
          email: doctorLogin[0].email,
        });
      } else {
        res.status(401).json({
          error: 'Authentication JWT Error',
          status: false,
          isDoctor: false,
        });
      }
    } else {
      res.status(401).json({
        error: 'Enter correct Email',
        status: false,
        isDoctor: false,
      });
    }
  } catch {
    res.status(401).json({
      error: 'Authentication JWT Error',
      status: false,
      isDoctor: false,
    });
  }
});

router.get('/searchDoctor/:name', loginGuard, async (req, res) => {
  try {
    const params = req.params.name;
    const doctor = await addDoctor.find({
      name: {$regex: params, $options: 'i'},
    });
    res.status(200).json({
      result: doctor,
      message: 'success',
    });
  } catch {
    res.status(500).json({
      error: 'There was a server side error!',
    });
  }
});

router.get('/allDoctors/:id', async (req, res) => {
  try {
    const doctor = await addDoctor.find({
      _id: req.params.id,
    });
    res.status(200).json({
      result: doctor,
      message: 'success',
    });
  } catch {
    res.status(500).json({
      error: 'There was a server side error!',
    });
  }
});

router.put('/update/:id', loginGuard, async (req, res) => {
  console.log(req.params.id);
  await addDoctor.findByIdAndUpdate(
    {_id: req.params.id},
    {
      $set: {
        status: req.headers.status,
      },
    },
    {
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: 'There was a server side error!',
        });
      } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        //    res.status(200).json({
        //        message: "Doctor was update successfully"
        //    })
      }
    }
  );
});

router.get('/doctorVerify', loginGuard, async (req, res) => {
  try {
    const doctor = await addDoctor.find({email: req.headers.email});
    console.log(doctor);
    if (doctor.length > 0) {
      res.status(200).json({
        email: req.headers.email,
        status: true,
      });
    } else {
      res.status(500).json({
        error: 'There was a server side error!',
        status: false,
      });
    }
  } catch {
    res.status(500).json({
      error: 'There was a server side error!',
      status: false,
    });
  }
});

module.exports = router;
