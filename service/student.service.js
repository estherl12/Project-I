const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const {sendCodeForRegister} = require('./userregmailsender.js');

async function getAll(){
    const rows = await db.query("Select * from student ");
    return rows;
}

async function createStudent(student){
    // let data = {
    //     from:"lamaesther5@gmail.com",
    //     to:`${student.email}`,
    //     subject:"Attend college regularly",
    //     text:"as you were absent in today class. plz sent mails for absence"
    // }
    //  sendCodeForRegister(data);
    const salt = await bcrypt.genSalt(10);
    const password =await bcrypt.hash(`${student.password}`,salt);
    const result = await db.query(`Insert into student(name,email,password,rollno) values('${student.name}','${student.email}','${password}','${student.rollno}')`);
    return result;
}

async function getOne(id){
    const result = await db.query(`Select * from student where rollno = '${id}'`);
    return result;
}

async function updateStudent(id,student){
    
     const studentByid = await db.query(`Select * from student where rollno = '${id}'`);
     if(!studentByid){
        throw new Error("Not found for update ");
     }
     const result = await db.query(`Update student set firstname = '${student.firstname}', lastname = '${student.lastname}' where rollno = '${id}' `);
     return result;
}
module.exports = {
    getAll,
    createStudent,
    getOne,
    updateStudent
}