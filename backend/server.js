const express = require('express')
const app = express()
const DbConnection = require('./DB/db')
//const corsOptions = require("./config/corsOption")
const path = require("path")
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const UserController = require("./Controllers/UserController")
// app.use('/', UserController)

require('dotenv').config()

// Database connection
DbConnection()

// Controller
app.use('/post/', UserController)


app.get('/*', (req,res)=>{
    res.status(404).send(`<h1>404 Error<h1>`)
});

// Start the server
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
