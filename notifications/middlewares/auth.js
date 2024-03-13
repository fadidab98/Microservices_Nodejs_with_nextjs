const { ValidateSignature } = require("../utils");

const auth = async(req,res,next)=>{

    const isAuthorized = await ValidateSignature(req);
        console.log(isAuthorized)
    if(isAuthorized){
        return next();
    }
    return res.status(403).json({message: 'Not Authorized'})
}
module.exports = auth