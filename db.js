const mongoose = require('mongoose')
const mongoURL = 'mongodb://localhost:27017/voter'

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


const db = mongoose.connection;
db.on('connected',()=>{
    console.log("database connected seccessfully");
})
db.on('error',()=>{
    console.log("error in connecting to database"); 
})
db.on('disconnected',()=>{
    console.log("database disconnected");
})
//export db
module.exports = db;