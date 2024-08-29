const express = require('express')
const router = express.Router()
const User = require('./../models/user')

//route to signup-POST method

router.post('/signup',async(req,res)=>{
    try{
    const data = req.body

    const newUser = new User(data);
    const response = await newUser.save();
    console.log("data saved - new user verified")

    // const payload = {
    //     id:response.id,
    //     username1:response.username
    // }
    }catch(err){

    }
})