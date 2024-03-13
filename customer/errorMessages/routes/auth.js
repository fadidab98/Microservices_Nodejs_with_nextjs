const { register,login } = require ("../controllers/AuthController.js");
const CustomerService = require("../services/CustomerServices.js");
const { ValidationError, ConflictError } = require("../utils/errors/app-errors.js");
const { SendToQueue, consumeServices } = require("../utils/index.js");
const registerValidation = require("../validation/registerValidation.js");
const service= new CustomerService()

module.exports = (app,channel) => {
    const service= new CustomerService()


app.post("/register",async(req,res,next)=>{

    let users;
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
            const data = await service.SignUp(req.body);
            console.log("data",data.user.dataValues)
            let info = data.user.dataValues;
            const infodata = {
                preload:"ADD_USER",
                info
            }
            SendToQueue(channel,"POST",infodata)
            consumeServices(channel,"USER")
            
                  return res.json({"status:":200,"data":data})
        }
           
        }catch(error){
           next(error)
        }
});
app.post("/login",login)


}