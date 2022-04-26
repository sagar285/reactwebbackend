const mongoose =require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
mongoose.connect("mongodb://localhost:27017/youtuberegistration").then(()=>{
    console.log("connection succesfull");
}).catch((e)=>{
    console.log("no connection");
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
         type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    work: {
         type: String,
        required:true
    },
    password: {
         type: String,
        required:true
    },
    cpassword: {
         type: String,
        required:true
    },
    tokens:[
    {
        token:{

         type: String,
        required:true
        }
    }
]
})

// hash the pashword 
userSchema.pre('save',async function(next){
    console.log("hi from inside ");
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword= await bcrypt.hash(this.cpassword,12);
    }
    next();
})

 //we are jenerating token or cookies 

 userSchema.methods.generateAuthToken = async function (){
     try {

        let tokensagar= jwt.sign({id:this._id},"talaahrjilabbjhindmadhyapradeshindoresagarguptajilabhindmadyapradeshbhinfdcgddrgfdssssss");
        this.tokens = this.tokens.concat({token:tokensagar});
       await  this.save();
        return tokensagar;

         
     } catch (error) {
         console.log(error);
         
     }
 }


const User = mongoose.model('USER', userSchema);

module.exports = User;