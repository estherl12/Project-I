const express = require('express');
const bodyParser = require('body-parser');
const  cors = require('cors')
const controller = require("./controller/mailsender.controller")
const studentRouter = require("./controller/student.controller")
const mysql = require('mysql2/promise')
require('dotenv').config();

const port = process.env.PORT
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.use('/api/email',controller);
app.use('/student',studentRouter);

app.listen(port,()=>{
    console.log("Server running on port  "+port);
})