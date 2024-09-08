const express = require('express');
const router = express.Router()
const { json } = require('body-parser')
const Candidate = require('./../models/candidate');
const User = require('./../models/user')
const checkFunction = async (UserId)=>{
    try{
       const user =  await User.findById(UserId);
        if(user.role ==='admin')
            return true;
    }
    catch(err){
        return false;
    }
}

router.post('/add_candidate',async(req,res)=>{
    console.log(req.body)
    try{
        if(!await checkFunction(req.user.id))
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
        if(! await checkFunction(req.user.id))
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


router.post('/vote/:candidateId',async (req,res)=>{
    candidateId = req.params.candidateId;
    userId = req.user.id;
try{

    const candidate = await Candidate.findById(candidateId)
    if(!candidateId){
        res.status(403).json({message:'Candidate not found'})
    }

    const user = await User.findById(userId)

    if(!user){
        res.status(403).json({message:'user not found'})
    }
    if(user.isVoted){
        res.status(403).json({message:'Already Voted'})
    }
    if(user.role === 'admin'){
        res.status(403).json({message:'You cant vote'})
    }

    //update candidate 

    candidate.votes.push({user:userId})
    candidate.voteCount++
    await candidate.save()

    //update user

    user.isVoted = true

    await user.save()

    res.status(200).json({message:'updated'})

    }catch(err){
        res.status(404).json({message:'server error'})
    }
})


router.get('/vote/count', async (req, res) => {
    try{
        // Find all candidates and sort them by voteCount in descending order
        const candidate = await Candidate.find().sort({voteCount: 'desc'});
        
        // Map the candidates to only return their name and voteCount
        const voteRecord = candidate.map((data)=>{
            console.log(data)
            return {
                party: data.PartyName,
                counts: data.voteCount
            }
        });

        return res.status(200).json(voteRecord);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Get List of all candidates with only name and party fields
router.get('/', async (req, res) => {
    try {
        // Find all candidates and select only the name and party fields, excluding _id
        const candidates = await Candidate.find({}, 'name party -_id');

        // Return the list of candidates
        res.status(200).json(candidates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;