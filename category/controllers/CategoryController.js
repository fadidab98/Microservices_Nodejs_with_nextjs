const CategoryServices = require("../services/CategoryServices.js")

 const create =async(req,res,next)=>{
    const service =  new CategoryServices();

    try{

        const {title,ar_title,description,ar_description,status} = req.body
        const image = req.files.image[0]
        const url = {title,ar_title,description,ar_description,image,status}
        console.log(url)
        const category = await service.CreateCategory(url)

        return res.json({"data":category})
    }catch(error){
        next(error)
    }


    

    
}

const index =async(req,res,next)=>{
    const service = new CategoryServices();

    try{
        const categories =await service.getAllCategory();
        return res.json({status:200,data:categories})

        
    }catch(error){next(error)}
}
module.exports = {create,index}