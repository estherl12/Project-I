const express = require('express')
const router  = express.Router();

const {
    getAll,
    createStudent,
    getOne,
    updateStudent
} = require('../service/student.service')

router.get("/",async function(req,res,next){
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
});

router.post('/',async function(req,res,next){
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
})
router.get('/:id',async function(req,res){
    const student = await getOne(req.params.id);
    if(!student){
        res.status(402);
        throw new Error("Not found");
    }
    res.status(201).send(student);
});
router.patch('/:id',async function(req,res){
    const data = await updateStudent(req.params.id,req.body);
    if(data){
        res.status(201).json({
            message:"updated successfully"
        })
    }
});

module.exports = router