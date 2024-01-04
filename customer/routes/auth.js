const csurf = require("csurf");
const CustomerService = require("../services/CustomerServices.js");
const { ValidationError, ConflictError, NOTFoundError } = require("../utils/errors/app-errors.js");
const { SendToQueue, consumeServices } = require("../utils/index.js");
const loginVaildation = require("../validation/loginVaildation.js");
const registerValidation = require("../validation/registerValidation.js");
const auth=require("../middlewares/auth.js");
const createUserValidation = require("../validation/createUserValidation.js");
const service= new CustomerService()


module.exports = (app,channel) => {
    const service= new CustomerService()


app.post("/register",async(req,res,next)=>{
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');

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
            SendToQueue(channel,"POST",infodata);
            SendToQueue(channel,"CART",infodata)
            SendToQueue(channel,"Notification",infodata)
            SendToQueue(channel,"Bazaar",infodata)
            SendToQueue(channel,"FAVORITE",infodata)

            consumeServices(channel,"USER");
            
                  return res.json({"status:":200,"data":data})
        }
           
        }catch(error){
           next(error)
        }
});
app.get('/csrf-token', (req, res) => {
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');

    res.json({ csrfToken: req.csrfToken() });
  });
app.post("/login",async(req,res,next)=>{
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    console.log("login start")
    console.log(req.body)
    const service= new CustomerService()
    try{
       const {error}= loginVaildation(req.body);
       const errors= error ? JSON.stringify(error.details[0]): " "
       if(error) throw new ValidationError( errors )
       
       const data = await service.LogInUser(req.body)
        console.log(data)
       return res.cookie('access_token', data?.token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
        secure: true, // Set to true in production
        sameSite: 'strict', // Adjust as needed for your use case
      }).json({"status:":200,"data":data}).sendStatus(200);
      
 
    }catch(error){
      next(error)
    }
})


app.get('/api/user/auth',[auth],async(req,res,next)=>{
    try{
        const id= req.user.id 
        console.log("user auth:",id)
        const user = await service.showUser(id)
        
        return res.json({status:200,data:user})
        
    }catch(error){next(error)}
})
app.get("/api/dashboard/userCount",async(req,res,next)=>{
    try{
        const count = await service.UsersCounts()
        console.log(count)

        return res.json({stats:200,data:count})
    }catch(error){
        next(error)
    }

})
app.get('/api/dashboard/users',async (req, res,next) => {
        const page = parseInt(req.query.page)||1 ;
        const search=  req.query.search?req.query.search:""
        console.log("search :",search)
        const limit = 10 ;
        const offset = (page-1) * limit  ;
    try{
        const users= await service.getAllUsers({search,offset,limit})
        const count = await service.UsersCounts()
        const totalPage = Math.ceil(+count /limit)
        console.log("users :",users)

        return res.json({
            status:200,
            data:users ,
            'pagination':{
                "offset": offset,
                "count":count,
                'totalPage':totalPage,
                'next':{
                    'page':page+1,
                    'limit':limit
                },
                'previous':{
                    'page':page-1,
                    'limit':limit
                }



            }
        })
        
    }catch(error){next(error)}

})
app.get("/api/user/show",async(req,res,next)=>{
    const id = req.query.id
    try{
        const user = await service.showUser(id)
        return res.json({status:200,data:user})
        
        


    }catch(error){next(error)}
});

app.get("/api/user/all",async(req,res,next)=>{
    
    try{
        const ids = await service.getUserIds()
        return res.json({status:200,data:ids})
        
        


    }catch(error){next(error)}
});
app.post("/api/dashboard/user/delete",async(req,res,next)=>{
     console.log(req.body)
    let id = parseInt(req.body.id)

    try{
        const checkUser = await service.showUser(id)
        if(!checkUser) throw new NOTFoundError("User Not Found")
        const User = await service.deleteUser(id)
        return res.json({status:200,msg:"User Deleted Successfuly"})

    }catch(error){next(error)}
})
app.post("/api/dashboard/user/create",async(req,res,next)=>{
    try{

const {error}= createUserValidation(req.body) 
        const {email}=req.body;
        console.log(req.body)
        const msg ='validation error '
        console.log("error controler" ,error)
        const errors= error ? JSON.stringify(error.details[0]): " "
        if(error) throw new ValidationError( errors )
        const user = await service.CheckUser({email})
        if(user)
        {
           throw new ConflictError( )
        }else{
            const data = await service.CreateUser(req.body);
            console.log("data",data.user.dataValues)
            let info = data.user.dataValues;
            const infodata = {
                preload:"ADD_USER",
                info
            }
            SendToQueue(channel,"POST",infodata);
            SendToQueue(channel,"CART",infodata)

            consumeServices(channel,"USER");
            
                  return res.json({"status:":200,"data":data})
        }
    }catch(error){next(error)}
})

}