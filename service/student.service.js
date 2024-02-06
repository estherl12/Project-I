const db = require('./db.js');

async function getAll(){
    const rows = await db.query("Select * from student ");
    return rows;
}

async function createStudent(student){
    const result = await db.query(`Insert into student(firstname,lastname) values('${student.firstname}','${student.lastname}')`);
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