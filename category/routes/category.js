const {  create,index } = require ("../controllers/CategoryController.js");
const auth = require("../middlewares/auth.js");
const multer =require( 'multer');
const CategoryServices = require("../services/CategoryServices.js");
const { SendToQueue, consumeServices } = require("../utils/index.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = (app,channel) => {
    const service =  new CategoryServices();
    app.post("/api/dashboard/category/create",upload.fields([{ name: 'image', maxCount: 1 }]),async(req,res,next)=>{
        console.log(req.body)
        try{

            const {title,ar_title,description,ar_description,status} = req.body
            const image = req.files.image[0]
            const url = {title,ar_title,description,ar_description,image,status}
            console.log(url)
            const category = await service.CreateCategory(url);
            const info = category.dataValues
            console.log(info)
            const infoData = {
                preload:"ADD_CATEGORY",
                info

            }
            await SendToQueue(channel,"POST",infoData);
           await consumeServices(channel,"CATEGORY")
            return res.json({"data":category})
        }catch(error){
            next(error)
        }
    });

    app.get('/api/category',async(req,res,next)=>{

 
        const page = parseInt(req.query.page)||1 ;
        const limit = 10 ;
        const offset = (page-1) * limit  ;
        const search=  req.query.search?req.query.search:""

        console.log("page",req.query.page)

        
        try{
            const category =await service.getAllCategory({search,limit,offset});
            const count = await service.CategoryCount()
            console.log("count",count)
            const totalPage = Math.ceil(+count /limit)
            return res.json({
                status:200,
                data:category,
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
    
    app.get("/api/category/show",async(req,res,next)=>{
        const id = req.query.id
        try{
            const category = await service.showCategory(id)
            return res.json({status:200,data:category})
            
            


        }catch(error){next(error)}
    });

    app.get("/api/category/all",async(req,res,next)=>{
        
        try{
            const ids = await service.getCategoryIds()
            return res.json({status:200,data:ids})
            
            


        }catch(error){next(error)}
    });
    app.post("/api/dashboard/category/delete",async(req,res,next)=>{
        
        let id = parseInt(req.body.id)
        console.log("categoryId",req.body)

        try{
            const checkCategory = await service.showCategory(id)
            if(!checkCategory) throw new NOTFoundError("Post Not Found")
            const category = await service.deleteCategory(id)
            return res.json({status:200,msg:"Post Deleted Successfuly"})

        }catch(error){next(error)}
    })
    app.get("/api/dashboard/categoryCount",async(req,res,next)=>{
        try{
            const count = await service.categoryCount()
            console.log(count)
    
            return res.json({stats:200,data:count})
        }catch(error){
            next(error)
        }
    
    })

}