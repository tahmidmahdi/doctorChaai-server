const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

// handle error
const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let data = {email: ""}

  // validation error
  if(err.message.includes('User validation failed')){
    Object.values(err.errors).forEach((error) => {
      data['email'] = error?.properties?.message
      
    })
  }
  // console.log(data.email)
  return data;
};

router.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    console.log("check existing user", existingUser);
    if (existingUser) {
      res.status(500).json({
        message: "Email Already in use",
        status: false,
      });
    } else {
      if (req.body.password.length >= 8) {
        //hashing with saltrounds 10
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
          message: "Signup is successful",
          status: true,
        });
      } else {
        res.status(500).json({
          message: "Min password length is 8 character",
          status: false
        });
      }
    }
  } catch (err) {
    const errors = handleErrors(err);
    const {email} = errors
    if(errors){
      res.status(500).json({
        message: email,
        status: false
      })
    }
    else{
      res.status(500).json({
        message: "Signup Failed",
        status: false
      });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    // console.log(user);
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      if (isValidPassword) {
        // generate token

        // asynchronous sign with algo RSA SHA256
        var token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          access_token: token,
          message: "Login is Successful",
          status: true,
          user: user[0].name,
        });
      } else {
        res.status(401).json({
          error: "Authentication JWT ERROR",
          status: false
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication User",
        status: false
      });
    }
  } catch {
    res.status(401).json({
      message: "Authentication Try Error",
      status: false
    });
  }
});

module.exports = router;
