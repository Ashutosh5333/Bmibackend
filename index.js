const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt= require("bcrypt")
const { connection } = require("./config/db")
const {Usermodel} = require("./models/User.model")
const {BmiRouter} = require("./routes/bmi.route")
const { authenticate } = require("./middleware/authentication")
 const cors = require("cors")

const app = express()
app.use(express.json())

app.get("/" , (req,res) => {
    res.send("welcome home")
})

app.use(cors({
   origin:"*"
}))


app.get("/getprofile", async(req,res) =>{
  const getprof = await Usermodel.find()
  res.send(getprof)
})



app.post("/signup", async(req,res) => {
     const {email,password,name}= req.body;
        const userPresent = await Usermodel.findOne({email})
          if(userPresent){
            res.send("user is already Present")
            return 
          }
      try{
        bcrypt.hash(password, 4, async function(err, hash) {
            const user = new Usermodel({email,password:hash,name})
            await user.save()
            res.send("User created  succesfully")
        })
      }
      catch(err){
        console.log(err)
        res.send("Something went wrong ply try again later")
      }
})


app.post("/login", async(req,res) =>{
      const {email,password} = req.body;
      try{
       const user = await Usermodel.find({email})
          console.log(user)
         if(user.length > 0){
            const hashed_password = user[0].password;
            console.log("hash",hashed_password)
            bcrypt.compare(password,hashed_password,function(err, result){
                if(result){
                    const token= jwt.sign({"userID":user[0]._id}, "hush");
                    res.send({"msg":"Login sucessfull", "token":token})
                }
                else{
                    res.send("login failed 1")
                }

            }) }

            else{
              res.send("Login failed 2")
            }
      }
      catch{
        res.send("Login failed 3")
      }
})



//  app.use(authenticate)
 app.use(BmiRouter)



app.listen(8000, async (req,res) =>{
      try{
        await connection;
        console.log("connected to database")
      }
      catch(err){
        console.log("something went wrong in connecting")
        console.log(err)
      }

    console.log("listening on port 8000")
})



