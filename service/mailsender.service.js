const nodemailer = require('nodemailer')
require('dotenv').config()
const config = {
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:true,
    auth:{
        user:"lamaesther5@gmail.com",
        pass:process.env.PASS
    }
}
module.exports.send = async () => {
    const data = {
        from:"lamaesther5@gmail.com",
        // to:"akashkhadka099@gmail.com",
        to:"esther.7037807@gpkmc.edu.np",
        subject:"Attend college regularly",
        text:"as you were absent in today class. plz sent mails for absence"
    }
    const transporter = nodemailer.createTransport(config)
    transporter.sendMail(data,(err,info)=>{
        if(err){
            console.log(err);
            return err;
        }else{
            return info.response
        }
    });
}