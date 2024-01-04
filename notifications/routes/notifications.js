const NotificationService = require("../services/notificationService");
const { SubscribeMessage } = require("../utils");
const auth=require("../middlewares/auth.js");

module.exports = (app,channel) => {
    const service= new NotificationService()
    SubscribeMessage(channel, service);
    
    app.get("/api/notification",[auth],async(req,res,next)=>{
        const n = req.query.number?req.query.number:1
        const number = n *4
        console.log("routes ",number)

        const user = req.user.id;
        const notification  = await service.getNotification(user,number)
        console.log("front",notification)
        return res.json({status:200,data:notification})



    })
    app.get("/api/dashboard/notification/all",async(req,res,next)=>{
        const ids = await service.getNotIds()
        return res.json({status:200,data:ids})
    })
    app.get("/api/dashboard/notification/show",async(req,res,next)=>{
        const id = req.query.id
        try{
            const not = await service.showNot(id)
            return res.json({status:200,data:not})
            
            
    
    
        }catch(error){next(error)}
    });

}