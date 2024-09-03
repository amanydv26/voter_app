const mongoose = require('mongoose')
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



const User = mongoose.model('User' , userSchema);
module.exports = User;