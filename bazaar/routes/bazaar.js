const { SubscribeMessage } = require("../utils/index.js");
const auth=require("../middlewares/auth.js");
const BazaarService = require("../services/BazaarService.js");

module.exports = (app,channel) => {
    const service= new BazaarService()
    SubscribeMessage(channel, service);

    app.post("/api/bazaar/post",async(req,res,next)=>{
        const id = req.query.postid;
        const {userid,offer}=req.body
        const bazaar = await service.postOffer({userid,offer,id})
        return res.json({
            status:200,
            data:bazaar
        })
    })
    app.post("/api/bazaar/create",[auth],async(req,res,next)=>{
        try{
            
        const {start,end,postid}=req.body
        const bazaar = await service.createBazaar({postid,start,end})
        return res.json({status:200,data:bazaar})
        
        }catch(error){next(error)}
        
    })
    app.get("/api/bazaar/post/bids",[auth],async(req,res,next)=>{
        try{
/*             const user = req.user.id;
 */            const post = req.query.post;
                console.log(req.query)
                const bids = await service.getBids({post})
                return res.json({status:200,data:bids})
        }catch(error){next(error)}
    })
   

}