const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keysecret="helloworldsecrethelloworldsecrethelloworld";
const userSchema=mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
         required:true ,
         trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }},
    password:{
   type:String,
   required:true,
   minlength:6
    },
    cpassword:{
        type:String,
        required:true,
        minlength:6
         },
    tokens:[
        {
        token:{
            type:String,
            required:true
        }
    }
    ]
})
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
   this.password=await bcrypt.hash(this.password,6);
   this.cpassword=await bcrypt.hash(this.cpassword,6);
}
   next();
})

userSchema.methods.generateToken=async function(){
    try {
        let token123=jwt.sign({_id:this._id},keysecret,{
            expiresIn:"1d"
        })
        this.tokens=this.tokens.concat({token:token123})
        await this.save();
        return token123;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Error generating token');
    }
}


const userDb=new mongoose.model("users",userSchema)
module.exports = userDb;