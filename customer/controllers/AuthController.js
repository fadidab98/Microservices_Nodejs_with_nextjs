const CustomerMessage = require ("../errorMessages/Customer.js")
const { FormData, GenerateSignature } = require ("../utils/index.js")
const CustomerService = require ("../services/CustomerServices.js")
const { ValidationError, ConflictError } = require("../utils/errors/app-errors.js")
const registerValidation = require("../validation/registerValidation.js")
const loginVaildation = require("../validation/loginVaildation.js")


 const register =async(req,res,next)=>{


    const service= new CustomerService()
    
      
            try{  
            const {error}= registerValidation(req.body) 
            const {email}=req.body;
            const msg ='validation error '
            console.log("error controler" ,error)
            const errors= error ? JSON.stringify(error.details[0]): " "
            if(error) throw new ValidationError( errors )
            const user = await service.CheckUser({email})
            if(user)
            {
               throw new ConflictError( )
            }else{
                const data = await service.SignUp(req.body)
                      return res.json({"status:":200,"data":data})
            }
               
            }catch(error){
               next(error)
            }

    
}
const login=async(req,res,next)=>{
 
}

module.exports = {login,register}