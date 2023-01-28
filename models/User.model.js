const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    email:String,
    password:String,
    name:String
})

const Usermodel = mongoose.model("user",UserSchema)

module.exports ={Usermodel}