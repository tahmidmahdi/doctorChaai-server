//  require external
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const adminSchema = require('../schemas/adminSchema');
const admin = new mongoose.model('admin', adminSchema);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const addAdmin = await new admin({
      email: req.body.email,
      password: hashedPassword,
    });
    addAdmin.save();
    res.status(200).json({
      message: 'Sign up successful',
    });
  } catch {
    res.status(500).json({
      error: 'Authentication Error!',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const adminLogin = await admin.find({ email: req.body.email });
    console.log(adminLogin);
    if (adminLogin && adminLogin.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        adminLogin[0]?.password
      );

      if (isValidPassword) {
        // generate token
        // async with RSA 256
        const token = jwt.sign(
          {
            email: adminLogin[0].email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );
        res.status(200).json({
          access_token: token,
          message: 'Login is Successful ',
          status: true,
          email: adminLogin[0].email,
        });
      } else {
        res.status(401).json({
          error: 'Authentication JWT ERROR',
        });
      }
    }
  } catch {
    res.status(500).json({
      error: 'Authentication Error! ',
    });
  }
  // admin blog post
  router.post('/addBlog', async (req, res) => {
    try {
      const blogPost = await new blog(req.body);
      blogPost.save();
      res.status(200).json({
        message: 'Successfully blog added',
        status: true,
      });
    } catch {
      res.status(200).json({
        message: 'There is a Error with your request',
        status: false,
      });
    }
  });
});

module.exports = router;
