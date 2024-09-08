const express = require('express')
const router = express.Router()
const User = require('./../models/user')
const { json } = require('body-parser')
const {jwtAuthMiddleware, generateToken} = require('../jwt')
//route to signup-POST method

router.post('/signup',async(req,res)=>{
    try{
    const data = req.body
    const adminuser = await User.findOne({role:'admin'})
    if(data.role ==='admin' && adminuser){
        return res.status(400).json({ error: 'Admin user already exists' });
    }
    const newUser = new User(data);
    const response = await newUser.save();
    console.log("data saved - new user verified")

    const payload = {
        id:response.id,
        
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("token is ",token);
    res.status(200).json({response:response,token : token});
    }catch(err){
        console.log(err);
        res.status(400).json({error:"Internal server error"});
    }
})
router.post('/login',async(req,res)=>{
    try{
        const {aadharCard,password} = req.body;
        console.log(aadharCard);
        console.log(password);
  // Check if aadharCardNumber or password is missing
  if (!aadharCard || !password) {
    return res.status(400).json({ error: 'Aadhar Card Number and password are required' });
}
        const user = await User.findOne({aadharCard:aadharCard});
        if(!user||!(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid username or password"})

        }
        res.status(200).json({ message: 'Login successful!' });
        const payload = {
            id:user.id,
            // username:response.username
        }
        const token = generateToken(payload);
        res.json({token});
    }catch(err){
        console.log(err)
        res.status(500).json({error:"server error"});

    }
})

router.get('/profile',async(req,res)=>{
    console.log(req.user);
    try{
        const UserData = req.User;
        const userId = UserData.id;
        const user = await User.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal error'});
    }
})

module.exports = router;