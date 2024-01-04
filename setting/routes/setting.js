const auth = require("../middlewares/auth.js");
const multer =require( 'multer');
const SettingServices = require("../services/SettingServices.js");
const { SendToQueue, consumeServices } = require("../utils/index.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = (app,channel) => {
    const service =  new SettingServices();
   /* route hier */
   app.get("/api/setting",async(req,res,next)=>{
   let setting;
   setting= await service.getSetting()
    
    return res.json({status:200,data:setting})

    })
   app.get("/api/dashboard/setting",[auth],async(req,res,next)=>{
    return "hi"
   })
   app.post("/api/dashboard/setting/post",[auth],async(req,res,next)=>{
    return "hi"
   })
   app.post("/api/dashboard/setting/update",[auth],async(req,res,next)=>{
    return "hi"
   })
}