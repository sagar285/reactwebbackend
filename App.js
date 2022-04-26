const dotenv = require("dotenv");
const express = require("express");
const app =  express();
require("./model/conn");
app.use(express.json());
app.use(require("./ROUTER/auth")); 

process.env.SECRET_KEY;
// router ko direct nhi le skte  we link the router file 
const port =process.env.PORT||8000;

 dotenv.config({path:"./config.env"});    //To acces any vqriable from .env file 
// secure you api in dot env file
//middleware 
const  middleware =(req,res,next)=>{
    console.log("hello my middleware");
    next();
}
app.get('/', async(req,res)=>{
    res.send("hello world from sagar")

})
app.get('/about',middleware,(req,res)=>{
    res.send("hello world from prashant");

})
app.get('/contact', async(req,res)=>{

    res.cookie("test","sagar");
    res.send("helo contact us page");

})
app.get('/login', async(req,res)=>{

})
app.get('/signup', async(req,res)=>{

})
app.listen(port,()=>{
    console.log(`server is runing at ${port}`);
})