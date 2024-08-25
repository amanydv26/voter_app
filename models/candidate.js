const mongoose = require('mongoose')
const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    PartyName:{
        type:String,
        require:true
    },

    
})