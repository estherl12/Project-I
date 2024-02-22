const express = require('express');
const bodyParser = require('body-parser');
const  cors = require('cors')
const controller = require("./controller/mailsender.controller")
const studentRouter = require("./router/student.router")
const authRouter = require("./router/auth.router")
const mysql = require('mysql2/promise')
const multer = require('multer');
const upload = multer();
require('dotenv').config();

const port = process.env.PORT
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(upload.array());

app.use('/api/email',controller);
app.use('/',authRouter);
app.use('/student',studentRouter);

app.listen(port,()=>{
    console.log("Server running on port  "+port);
})