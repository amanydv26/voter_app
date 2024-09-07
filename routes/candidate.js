const express = require('express');
const router = express.Router()
const { json } = require('body-parser')
const Candidate = require('./../models/candidate');
const User = require('./../models/user')
const checkFunction = async (UserId)=>{
    try{
       const user =  await User.findById(UserId);
        return user.role ==='admin';
    }
    catch(err){
        return false;
    }
}

router.post('/add_candidate',async(req,res)=>{
    try{
        if(!checkFunction(req.user.id))
        return res.status(404).json({message:'user is not admin'})

        const data = req.body
        const newCandidate = new Candidate(data);
        const response = await newCandidate.save()
        console.log("data saved - new candidate verified")
        res.status(200).json({response:response})

    }catch(err){
        console.log(err)
        res.status(500).json({error:"server error"});
    }
})

router.put('/:candidateId' , async(req,res)=>{
    try{
        if(!checkFunction(req.user.id))
        return res.status(404).json({message:'user is not admin'})
        
        const candidate = req.params.candidateId;
        const UpdatedData = req.body

        const response = await Candidate.findByIdAndUpdate(candidate , UpdatedData,{
            new:true,
            runValidators:true
        });
        if(!response)
           return res.status(404).json({error:'user not found'})

        console.log("data updated");
        res.status(200).json(response)
    }catch(err){
        res.status(404).json({error:'Internal server Error'})
    }
})

router.delete('/:candidateId' , async (req,res)=>{
    try{
        if(!checkFunction(req.user.id))
            return res.status(403).json({message:'user is not admin'})

        const candidate = req.params.candidateId
        const response = await Candidate.findByIdAndDelete(candidate)

        if(!response){
            return res.status(403).json({message:'user not found'})
        }
        
        console.log("user deleted")
        res.status(200).json(response)

    }
    catch(err){
        res.status(404).json({error:'Internal server error'})
    }
})



module.exports = router;