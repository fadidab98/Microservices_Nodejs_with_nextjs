const { ValidateSignature } = require("../utils");

const checkAdmin = async(req,res,next)=>{

    let admin;
    admin = req.user.role 
    console.log("role",admin)
    if(admin==1){
        console.log("access")
        return next();
    }
    console.log("denied")
    return res.status(403).json({message: 'Access Denied'})
}
module.exports = checkAdmin