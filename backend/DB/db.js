const mongoose = require('mongoose')

const DbConnection = ()=>{
mongoose.connect("mongodb+srv://user:user123@cluster0.rcgouuc.mongodb.net/")
    .then(
        (con)=> console.log(`MongoDB is connected to the host :${con.connection.host}`)
    )
    .catch(
        (err)=>console.log(err)
    )
}

module.exports = DbConnection