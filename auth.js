const express = require('express');
const User = require('../model/conn');
const router = express.Router();
const bcrypt = require("bcryptjs");   
const jwt = require("jsonwebtoken");

require("../model/conn");
router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});

router.post('/register', (req, res) => {
     const {name,email,phone,work,password,cpassword} = req.body;
     if(!name|| !email|| !phone|| !work|| !password|| !cpassword){
         return res.status(422).json({error:"plz filled the field properly"});


     }

     User.findOne({email:email}).then((userExist)=>{
         if(userExist){
            return res.status(422).json({error:"This email already registered"});
         }
         const user = new User({ name,email,phone,work,password,cpassword});
         user.save().then(()=>{
             res.status(201).json({message:"user registered succesfully "});
         }).catch((err)=>{
             res.status(500).json({error :"failed to register"});
         });
     }).catch(err=>{console.log(err);});

    // console.log(req.body);
    // res.json({ message: req.body });
    // // res.send("mera register page");
});
router.post('/login',async(req,res)=>{
    try {
        const {email , password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"plz filled all your field"});
        }
        const userlogin =await User.findOne({email:email});
        console.log(userlogin);
      
            const ismatch = await bcrypt.compare(password,userlogin.password);
            console.log(ismatch);

    const token =  await userlogin.generateAuthToken();
    console.log(token);
    res.cookie("jwtoken",token,{
        expires:new Date(Date.now() + 25*60*60*24),
        httpOnly:true
    });




  if(!ismatch){
      res.status(400).json({error:"user error"})
  }else{
      res.json({message:"user login succesfully"})
  }

    } catch (error) {
        console.log(error);   
    }
})

module.exports = router;