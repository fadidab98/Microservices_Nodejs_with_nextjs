 function errorHandler(Error,req,res,next) {
    
    
    res.status(Error.statusCode || 500).json({status:Error.statusCode || 500,"message": Error.data ||Error.message})

}
module.exports  =errorHandler