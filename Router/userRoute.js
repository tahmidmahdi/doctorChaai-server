const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

router.post("/signup", async (req, res) => {
  try {

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
    });
  } catch (err) {
    res.status(500).json({
      message: "Signup Failed",
    });
  }
});

router.post('/login', async (req,res) => {
    try{
        const user = await User.find({email: req.body.email});
        console.log(user);
        if ( user && user.length > 0 ) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password)

            if(isValidPassword) {
                // generate token 

                // asynchronous sign with algo RSA SHA256
                var token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });
                res.status(200).json({
                    "access_token" : token,
                    "message" : "Login Successful"
                })
            } else{
                res.status(401).json({
                    "error" : "Authentication JWT ERROR"
                })
            }

        } else{
            res.status(401).json({
                "error" : "Authentication USer"
            })
        }
    } catch{
        res.status(401).json({
            message: "Authentication Try Error"
        })
    }
})

module.exports = router;

