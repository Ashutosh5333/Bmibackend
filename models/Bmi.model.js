 const mongoose = require("mongoose")


 const BMISchema = mongoose.Schema({
     height:String,
     weight:String,

 })

 const  BmiModel = mongoose.model("bmi",BMISchema)

 module.exports={
    BmiModel
 }