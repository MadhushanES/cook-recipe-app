const express = require('express')
const bcrypt = require('bcryptjs')
const { hashPassword,generateAccessToken} = require('./helper')
const signUpSchema = require('../Model/Register')


const router = express.Router()

//Register Route
router.post("/Signup", async (req, res) => {
  try {
    const existEmail = await signUpSchema.findOne({ UserEmail: req.body.uemail })

    if (existEmail) {
      return res.status(400).json("Email already exists")
    }

    const hashPwd = await hashPassword(req.body.upass)

    const signUpData = new signUpSchema({
      FirstName: req.body.fname,
      LastName: req.body.lname,
      UserEmail: req.body.uemail,
      PhoneNumber: req.body.pnumber,
      UserPassword: hashPwd,
    });

    const postUser = await signUpData.save()

    if (postUser) {
      return res.status(200).json("Registered successfully!")
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json("Duplicate key found")
    }
    return res.status(400).json(err.message || err)
  }
});

// Login Route
router.post("/Login", async (req, res) => {
  try {
    const validData = await signUpSchema.findOne({ UserEmail: req.body.uemail }).select('+UserPassword')
    console.log(validData)

    if (!validData) {
      return res.status(400).json("Invalid email")
    }

    const isPasswordValid = await bcrypt.compare(req.body.upass, validData.UserPassword)

    if (isPasswordValid) {
      const userToken = generateAccessToken(validData)
      res.header('Authorization', `Bearer ${userToken}`).json({ token: userToken })
    } else {
      return res.status(400).json("Invalid password")
    }
  } catch (err) {
    return res.status(500).json(err.message || err)
  }
})

module.exports = router;
