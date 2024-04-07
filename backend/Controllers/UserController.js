const express = require('express')
const bcrypt = require('bcryptjs')
const { hashPassword,generateAccessToken} = require('./helper')
const authenticateToken = require('./helper').authenticateToken
const signUpSchema = require('../Model/Register')
const meal = require('../Model/Meal');
const cors = require('cors')
const app = express()
const router = express.Router()

app.use(cors())

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

// Route to add a favorite meal
router.post("/favor", authenticateToken, async (req, res) => {
  // console.log("hi")
  try {
      const userId = req.user.UserEmail
      const { mealId, mealName, thumbnail } = req.body
      console.log(userId);

      // Find the user by ID
      const user = await signUpSchema.findOne({ UserEmail: userId})
      console.log(user);

      // Check if the meal is already a favorite
      const existingMeal = user.favoriteMeals.find(meal => meal.mealId === mealId)
      if (existingMeal) {
          return res.status(400).json({ error: "Meal already exists in favorites" })
      }

      // Add the favorite meal to the user's favoriteMeals array
      user.favoriteMeals.push({ mealId, mealName, thumbnail })

      // Save the updated user document
      await user.save()

      res.status(200).json({ message: "Favorite meal added successfully!" })
  } catch (err) {
      res.status(500).json({ error: err.message || err })
  }
})


// Route to get favorite meals
router.get("/favorites", authenticateToken, async (req, res) => {
  try {
      const userId = req.user.UserEmail;

      // Find the user by ID
      const user = await signUpSchema.findOne({UserEmail: userId});

      // Return the favoriteMeals array
      res.status(200).json({ favoriteMeals: user.favoriteMeals });
  } catch (err) {
      res.status(500).json({ error: err.message || err });
  }
});

module.exports = router;
