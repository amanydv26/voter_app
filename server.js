const express = require('express')
const app = express();

const db = require('./db') //importing DB
require('dotenv').config();
const bodyParser = require('body-parser')
app.use(bodyParser.json())


const UserRoutes = require('./routes/userRoutes');
app.use('/',UserRoutes);
app.listen(3000,()=>{
    console.log("server is running");
})