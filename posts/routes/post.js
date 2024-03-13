/* const { register,login } = require ("../controllers/AuthController.js") */
const PostService = require("../services/PostService.js")
const multer =require( 'multer');

const { ValidationError, NOTFoundError } = require("../utils/errors/app-errors.js")
const { SubscribeMessage, SendToQueue, consumeServices } = require("../utils/index.js")
const PostValidation = require("../validation/PostEnValidation.js")
const auth=require("../middlewares/auth.js");
const PostArValidation = require("../validation/PostArValidation.js");
const PostEnValidation = require("../validation/PostEnValidation.js");
const csurf = require("csurf");
const checkAdmin = require("../middlewares/checkAmin.js");
const storage = multer.memoryStorage();
const axios = require("axios")
const upload = multer({ storage: storage });
module.exports = (app,channel) => {
    const service= new PostService()
    
    SubscribeMessage(channel, service);
    
    app.get("/api/post/userPosts",[auth],async(req,res,next)=>{
        const userid = req.user.id;
        console.log("userid :",userid)
        try{
         const userPosts= await service.userPosts({userid});
         res.json({status:200,data:userPosts})
        }catch(error){next(error)}
     });
     app.get("/api/post/userPost",[auth],async(req,res,next)=>{
        const userid = req.user.id;
        const postid = req.query.post;

        console.log("userid :",userid)
        try{
         const userPost= await service.userPost({userid,postid});
         res.json({status:200,data:userPost})
        }catch(error){next(error)}
     });
    app.post("/post/create",[auth],upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images' }]),async(req,res,next)=>{
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');

 try {   


/*     const lang = req.query.lang

    if(lang=="ar")
    {
        console.log(req.body)
    
        const image1 = req.files.image? req.files.image[0]:{}
        
        const data = Object.assign(req.body,{'image':image1}) 
        const images =req.files.images
        const AllData = Object.assign(data,{'images':images}) 
    
    
      
    
        const {title,ar_title,description,ar_description,type,image,price,kitchen,salon,bedroom ,bathroom,garden ,floor,locationid,categoryid=1,sale_status}=AllData

         
        const {error} = PostArValidation(AllData)
        console.log('image1')
        const errors= error ? JSON.stringify(error.details[0]): " "
        if(error) throw new ValidationError( errors )
        const details= await service.createDetails({kitchen,salon ,bedroom ,bathroom,garden,floor})
        const detailsid = details.dataValues.id;
        console.log(details,"detailsid",detailsid)
        const  userid=3
        const post= await service.createPost({title,ar_title,description,ar_description,type,price,image,sale_status,detailsid,locationid,userid,categoryid})
        const info = post.dataValues
        console.log(info)
        const infoData = {
            preload:"ADD_POST",
            info
    
        }
        SendToQueue(channel,"CART",infoData);
        consumeServices(channel,"POST")
        
        return res.json({"status:":200,"data":post}) 
        
    }else{ */
        console.log(req.body)
        console.log("files : ", req.files)
        const image1 = req.files.image? req.files.image[0]:{}
        
        const data = Object.assign(req.body,{'image':image1}) 
        const images =req.files.images
        const AllData = Object.assign(data,{'images':images}) 
    
    
        const {title,ar_title,description,ar_description,type,image,price,kitchen,salon,bedroom ,bathroom,garden ,floor,locationid,categoryid=1,sale_status}=AllData

    
       
         
        const {error} = PostEnValidation(AllData)
        console.log('image1')
        const errors= error ? JSON.stringify(error.details[0]): " "
        if(error) throw new ValidationError( errors )
        const details= await service.createDetails({kitchen,salon ,bedroom ,bathroom,garden,floor})
        const detailsid = details.dataValues.id;
        console.log(details,"detailsid",detailsid)
        const  userid=req.user.id
        const post= await service.createPost({title,ar_title,description,ar_description,type,price,image,sale_status,detailsid,locationid,userid,categoryid})
        const info = post.dataValues
        console.log(info)
        const infoData = {
            preload:"ADD_POST",
            info
    
        }
       

        SendToQueue(channel,"FAVORITE",infoData);
        consumeServices(channel,"POST")
        
        return res.json({"status:":200,"data":post}) 
    
  
    }catch(error){
    next(error)
    }
});
    app.post("/post/location/create",async(req,res,next)=>{
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');

    try{
        const {location} = req.body;
       const lc =   await service.createLocation({location});
         const info = lc.dataValues
         console.log(info)
         const infoData = {
             preload:"ADD_LOCATION",
             info
     
         }
         SendToQueue(channel,"CART",infoData);
         consumeServices(channel,"POST")
        return res.json({status:200,msg:'Location Added Successfully'})
    }catch(error){next(error)}
    });
    app.get("/add-house",async(req,res,next)=>{
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');

        const location = await service.getLocations();
        return res.json({status:200,data:location})
    })
    app.get("/posts",csurf({ cookie: true }), async(req,res,next)=>{

        let min,max
        let min_area,max_area
        console.log( parseInt(req.query.page))
        const page = parseInt(req.query.page)||1 ;
        const limit = 10 ;
        const offset = (page-1) * limit  ;
        const location = parseInt(req.query.location)||''
        const type = isNaN(req.query.type)?undefined:req.query.type.toString()
        const price = parseInt(req.query.price)||''
        const area = String(req.query.area)||''
        const floor = isNaN( String(req.query.floor))?'': String(req.query.floor)
        console.log(req.query)
        if(price==1){
            min = 50000000;
            max= 100000000
        }else if(price==2){
            min = 100000000;
            max= 150000000
        }else if(price ==3){
            min = 150000000;
            
        }
        if(area==1){
            min_area = 1;
            max_area= 50
        }else if(area==2){
            min_area = 50;
            max_area= 100
        }else if(area ==3){
            min_area = 100;
            max_area= 150
            
        }else if(area==4){
            min_area = 150;
            max_area= 200
        }else if(area ==5){
            min_area = 200;
            
        }

        console.log("price _",min , max)
        console.log("area _",min_area , max_area)
        console.log("floor _",floor)

    try{
        const post =await service.getAllPost({limit,offset,type,location,min,max,floor,min_area,max_area});
        const locations =await service.getLocations() 
        const count = await service.PostsCount({type,location,min,max,floor,min_area,max_area})
        console.log("count",count)
        const totalPage = Math.ceil(+count /limit);
        console.log("posts :",count)
        return res.json({
            status:200,
            data:post,
            locations:locations,
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

    });
    app.get("/api/dashboard/postCount",async(req,res,next)=>{
        try{
            console.log("do Jetzt Count")
            const count = await service.PostsCounts()
            console.log(count)

            return res.json({stats:200,data:count})
        }catch(error){
            next(error)
        }

    })
    app.get("/all/users",async(req,res,next)=>{
        const users =   await service.allUsers();
        return res.json({stats:200,data:users})

    })
    app.get("/all/categories",async(req,res,next)=>{
        const categories =   await service.allCategory();
        return res.json({stats:200,data:categories})

    })
    app.get("/allposts",csurf({ cookie: true }), async(req,res,next)=>{

        try{
            const post =await service.getAllPost({limit,offset,type,location,min,max,rooms,area});
    
            return res.json({
                status:200,
                data:post,
            
            })

        }catch(error){next(error)}

    });

    app.get("/api/post/show",async(req,res,next)=>{
        const id = req.query.id
        try{
            const post = await service.showPost(id)
            return res.json({status:200,data:post})
            
            
    
    
        }catch(error){next(error)}
    });
    
    app.get("/api/post/all",async(req,res,next)=>{
        
        try{
            const ids = await service.getPostIds()
            return res.json({status:200,data:ids})
            
            
    
    
        }catch(error){next(error)}
    });
    app.get("/api/dashboard/posts",/* csurf({ cookie: true }), */ async(req,res,next)=>{

       
        
   
        
        let page = parseInt(req.query.page)||1 ;
        let limit = 10 ;
        const offset = (page-1) * limit  ;
        const search=  req.query.search?req.query.search:""

        try{
            const post =await service.getAllDashPost({search,limit,offset});
           
            const count = await service.PostsDashCount()
            console.log("count",count)
            const totalPage = Math.ceil(+count /limit)
            return res.json({
                status:200,
                data:post,
               
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

    });
    app.post("/api/dashboard/post/delete",async(req,res,next)=>{
  
        let id = parseInt(req.body.id)

        try{
            const checkPost = await service.showPost(id)
            if(!checkPost) throw new NOTFoundError("Post Not Found")
            const post = await service.deletePost(id)
            return res.json({status:200,msg:"Post Deleted Successfuly"})

        }catch(error){next(error)}
    });
    app.post("/api/dashboard/post/create",[auth],upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images' }]),async(req,res,next)=>{
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');

        try{
            console.log(req.body)
            console.log("files : ", req.files)
            const image1 = req.files.image? req.files.image[0]:{}
            
            const data = Object.assign(req.body,{'image':image1}) 
            const images =req.files.images
            const AllData = Object.assign(data,{'images':images}) 
        
        
            const {title,ar_title,description,ar_description,type,image,price,kitchen,salon,bedroom ,bathroom,garden ,floor,locationid,categoryid=1,sale_status}=AllData
    
        
           
             
            const {error} = PostEnValidation(AllData)
            console.log('image1')
            const errors= error ? JSON.stringify(error.details[0]): " "
            if(error) throw new ValidationError( errors )
            const details= await service.createDetails({kitchen,salon ,bedroom ,bathroom,garden,floor})
            const detailsid = details.dataValues.id;
            console.log(details,"detailsid",detailsid)
            const  userid=req.user.id
            const post= await service.createPost({title,ar_title,description,ar_description,type,price,image,sale_status,detailsid,locationid,userid,categoryid})
            const info = post.dataValues
            console.log(info)
            const infoData = {
                preload:"ADD_POST",
                info
        
            }
            SendToQueue(channel,"FAVORITE",infoData);
            consumeServices(channel,"POST")
            
            return res.json({"status:":200,"data":post}) 
        

        }catch(error){next(error)}
    })
    app.get("/api/post/getPost",async(req,res,next)=>{
        const relPost= req.query.postid;
        const relUser = req.query.userid;
        console.log("data rout :",relPost," : ",relUser)
        const postUser = await service.getPostUser(relPost,relUser);
        return res.json({status:200,data:postUser})
    })
   app.post("/api/dashboard/post/accept",[auth],async(req,res,next)=>{
    try{
        const post = req.query.post;
        const status= req.body.status;
        const editPost = await service.editPost({status,post});
        console.log("editPost",editPost)
        return res.json({status:200,data:editPost})
    }catch(error){next(error)}
   }) 
   app.post("/api/dashboard/post/update",async(req,res,next)=>{
    try{
        if(!req.files.image&&!req.files.images){
            const {title,ar_title,description,ar_description,type,price,kitchen,salon,bedroom ,bathroom,garden ,floor,locationid,categoryid=1,sale_status}=req.body

        }else if(req.files.image){
            const image1 = req.files.image? req.files.image[0]:{}
            const data = Object.assign(req.body,{'image':image1})
            const {title,ar_title,description,ar_description,type,image,price,kitchen,salon,bedroom ,bathroom,garden ,floor,locationid,categoryid=1,sale_status}=data

        
        }else if(req.files.images){
            const images =req.files.images
            const AllData = Object.assign(data,{'images':images}) 
            const {title,ar_title,description,ar_description,type,image,price,kitchen,salon,bedroom ,bathroom,garden ,floor,locationid,categoryid=1,sale_status}=data

        
        }else{
            const image1 = req.files.image? req.files.image[0]:{}
            
            const data = Object.assign(req.body,{'image':image1}) 
            const images =req.files.images
            const AllData = Object.assign(data,{'images':images}) 
        
        
            const {title,ar_title,description,ar_description,type,image,price,kitchen,salon,bedroom ,bathroom,garden ,floor,locationid,categoryid=1,sale_status}=AllData
    
        }

    }catch(error){next(error)}
   })
   
}

