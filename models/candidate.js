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
    votes:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                require:true
            },
            voteAt:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    voteCount:{
        type:Number,
        default:0
    }
})

const candidate = mongoose.model('Candidate' , candidateSchema);
model.exports = candidate