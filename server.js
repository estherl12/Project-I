const express = require('express');
const bodyParser = require('body-parser');
const  cors = require('cors')
const controller = require("./controller/mailsender.controller")
require('dotenv').config();
const port = process.env.PORT
const app = express()

var corsOption = {

}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/email',controller);
console.log(process.env.PASS)
app.listen(port,()=>{
    console.log("Server running on port  "+port);
})