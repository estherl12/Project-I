const restrict = (...roles) =>{
    return (req,res,next)=>{
        console.log(req.user)
        const userRole = req.user.role;
        const roleIncluded = roles.some((r)=>r.includes(userRole));
        if(!roleIncluded){
            res.status(403).send({msg:"forbidden for access!!"});
        }
        next();
    };
}
module.exports = {
    restrict
}