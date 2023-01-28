const express = require("express")

const {BmiModel}= require("../models/Bmi.model")

const BmiRouter = express.Router();


BmiRouter.get("/data", async(req,res) =>{
    const bmis = await BmiModel.find()
    res.send(bmis)
})


BmiRouter.post("/create", async(req,res) =>{
     const payload = req.body;
      try{
      const newbmi= new BmiModel(payload)
        await newbmi.save()
     res.send({"msg":"data added sucessfully"})
      }catch(err){
          console.log(err)
          res.send({"err":"Something went wrong"})
      }
})


// ================


BmiRouter.patch("/update/:bmiId", async(req,res) =>{
    const bmiId = req.params.bmiId
    const payload = req.body;
      
        await BmiModel.findByIdAndUpdate({_id:bmiId},payload)
        res.send({"msg":"update data created sucessfully"})
      
})


// ==============


BmiRouter.delete("/delete/:bmiId", async(req,res) =>{
    const bmiId = req.params.bmiId
     await BmiModel.findByIdAndDelete({_id:bmiId})
     res.send({"msg":"Delete data sucessfully"})
})


module.exports={BmiRouter}
 