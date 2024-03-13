const auth = require("../middlewares/auth.js");
const multer =require( 'multer');
const CategoryServices = require("../services/FavoriteServices.js");
const { SendToQueue, consumeServices, SubscribeMessage } = require("../utils/index.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = (app,channel) => {
    const service =  new CategoryServices();
    SubscribeMessage(channel, service);

   app.post("/api/favorite/add",[auth],async(req,res,next)=>{
    try{
        const user=req.user.id;
        const {postid}=req.body;
        console.log("user ",user)
        const fav = await service.addFav({user,post:postid});
        return res.json({status:200,data:fav})
    }catch(error){next(error)}
   })
    

   app.get("/api/favorite",[auth],async(req,res,next)=>{
    try{
        const user=req.user.id;
        const fav = await service.getFav({user});
        console.log(fav)
        return res.json({status:200,data:fav})
    }catch(error){next(error)}
   })
   app.post("/api/favorite/delete",[auth],async(req,res,next)=>{
    try{
        const favPost=req.query.post;
        const fav = await service.deleteFav({favPost});
        console.log(fav)
        console.log(favPost)

        return res.json({status:200,data:fav})
    }catch(error){next(error)}
   })
}