const db = require("../db/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require('nodemailer')

const config = {
  service:"gmail",
  host:"smtp.gmail.com",
  port:587,
  secure:true,
  auth:{
      user:"lamaesther5@gmail.com",
      pass:process.env.PASS
  }
};

const role = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
};

const loginUser = async (req, res, next) => {
  try {
    const [user] = await db.query(
      `select * from user where email = '${req.body.email}'`
    );
    if (user) {
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) {
        res.status(401).send("Wrong password/email");
        return;
      }
      const playload = { id: user.id, username: user.username,role:user.role}; // we have to change keep role and username instead of email
      const token = jwt.sign(playload, process.env.ACCES_TOKEN_SECRET);
      res.status(201).header("auth-token", token).send({ access_token: token });
      return;
    } else {
      res.status(401).send("Invalid email");
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "internal server error" });
    next(err);
    return;
  }
};

const registerUserStudent = async (req, res, next) => {
  try {
    let randomNumber = Math.floor(Math.random()*1000);
    const generatedPassword = `${req.body.username}`+"@"+`${randomNumber}`;
    const data = {
      from:"lamaesther5@gmail.com",
      to:`${req.body.email}`,
      subject:"Student password for GPKMC Portal",
      text:`Password : ${generatedPassword}`
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

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(`${generatedPassword}`, salt);

    const user = await db.query(
      `insert into user(firstname,middlename,lastname,email,phone,username,password,role) 
      values('${req.body.firstname}','${req.body.middlename}','${req.body.lastname}','${req.body.email}','${req.body.phone}','${req.body.username}','${password}','${role.STUDENT}')`
    );
    if (!user) {
      res.status(401).send({ msg: "couldnot create" });
    }
    res.status(201).json({
      message: "user created successfully",
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
};

const registerUserTeacher = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(`${req.body.password}`, salt);

    const user = await db.query(
      `insert into user(firstname,middlename,lastname,email,phone,username,password,role) 
      values('${req.body.firstname}','${req.body.middlename}','${req.body.lastname}','${req.body.email}','${req.body.phone}','${req.body.username}','${password}','${role.TEACHER}')`
    );
    if (!user) {
      res.status(401).send({ msg: "couldnot create" });
    }
    // res.status(201).json({rollno:student.rollno,firstname:student.firstname,lastname:student.lastname});
    res.status(201).json({
      message: "user created successfully",
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
};

module.exports = {
  loginUser,
  registerUserStudent,
  registerUserTeacher
};
