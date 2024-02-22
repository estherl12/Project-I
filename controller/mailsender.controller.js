const express = require('express');
const router = express.Router();

const mailService = require("../service/mailsender.service")
let data = {
    from:"lamaesther5@gmail.com",
    // to:"akashkhadka099@gmail.com",
    to:"esther.7037807@gpkmc.edu.np",
    subject:"Attend college regularly",
    text:"as you were absent in today class. plz sent mails for absence"
}
router.post('/',async(req,res)=>{

    const mail = await mailService.send();
    if(mail){res.send({
        "msg":"email successfully sent ",
})}else{
    res.status(400).send("error while sending email");
}

})
module.exports = router ;