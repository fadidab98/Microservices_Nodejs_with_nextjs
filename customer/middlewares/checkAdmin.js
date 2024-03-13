const { ValidateSignature } = require("../utils");

const checkAdmin = async(req,res,next)=>{

    let admin;
    admin = req.user.role == 1?1:0

    if(admin==1){
        return next();
    }
    return res.status(403).json({message: 'Forbiden'})
}
module.exports = checkAdmin