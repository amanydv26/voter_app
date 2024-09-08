const express = require('express')
const app = express();

const db = require('./db') //importing DB
require('dotenv').config();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const {jwtAuthMiddleware} = require('./jwt')

const UserRoutes = require('./routes/userRoutes');
const CandidateRoutes = require('./routes/candidate');
app.use('/user',UserRoutes);
app.use('/candidate',jwtAuthMiddleware,CandidateRoutes);
app.listen(3000,()=>{
    console.log("server is running");
})


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGM1ZmQxNDVmYWZhMTRkNzRmM2VmMiIsImlhdCI6MTcyNTcxODQ4MiwiZXhwIjoxNzI1NzQ4NDgyfQ._2LCxZlE9NBPD8bmTwbzy8dEuUx3HuPUNrrVa-Qj2Q4

//admin:-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGM2MDQ1NDYzYjk1MmQ2NjhkM2I2NCIsImlhdCI6MTcyNTcxODU5NywiZXhwIjoxNzI1NzQ4NTk3fQ.jTT6NOslWOyEKMGzXV8Ao0wDsPgvGHu5F2hCnh1g9iU