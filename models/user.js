const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
    },
    role:{
        type:String,
        enum:['admin','voter'],
        default:'voter'
    },
    aadharCard:{
        type:Number,
        require:true,
        unique:true
    },
    Password:{
        type:String,
        require:true
    },
    isVoted:{
        type:Boolean,
        default:false
    }
})
userSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified('Password')) return next();
    try{
        console.log("saving password as hashed...you are secured!!!")
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.Password,salt);
        user.Password = hashedPassword;
        next();
    
    }catch(err){
        return next(err);
    }
})
userSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        const Match = await bcrypt.compare(candidatePassword,this.Password);
        return Match;
    }catch(err){
        throw err;
    }
  };


const User = mongoose.model('User' , userSchema);
module.exports = User;