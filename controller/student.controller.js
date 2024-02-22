const express = require('express')
const router  = express.Router();

const {
    getAll,
    createStudent,
    getOne,
    updateStudent
} = require('../service/student.service')

const getStudents = async(req,res,next)=>{
    try{
        const data = await getAll();
        if(!data){
            res.status(404).json({"msg":"no data available"})
        }
        res.send({students:data});
    }catch(err){
        res.json("error in retreiving data");
        console.error("Error while retreiving data",err.message);
        next(err);
    }
};

const createOne = async (req,res,next)=>{
    try {
        const student = await createStudent(req.body);
        if(!student){
            res.json({"msg":"could not create"});
        }
        // res.status(201).json({rollno:student.rollno,firstname:student.firstname,lastname:student.lastname});
        res.status(201).json({
            message:"student created",
            // data:student.affectedRows
        })
    } catch (err) {
        res.status(500);
        next(err);
        
    }
}
const getById = async (req,res)=>{
    const student = await getOne(req.params.id);
    if(!student){
        res.status(402);
        throw new Error("Not found");
    }
    res.status(201).send(student);
};

const updateOne = async (req,res)=>{
    const data = await updateStudent(req.params.id,req.body);
    if(data){
        res.status(201).json({
            message:"updated successfully"
        })
    }
};

module.exports = {
    getStudents,
    getById,
    createOne,
    updateOne
}