const FavoriteRepository = require("../models/repository/FavoriteRepository.js");
const { BadRequestError, ValidationError, ConflictError, NOTFoundError } = require("../utils/errors/app-errors.js");
const { FormData} = require ("../utils/index.js");

 class FavoriteServices {

    constructor(){
        this.repository = new FavoriteRepository();
       
      
    }
    async CreatePost(inputData){
        const {id,image,title,description,ar_title,ar_description,sale_status,type,price}=inputData
        
   

        const post = await this.repository.CreatePost({id,image,title,description,ar_title,ar_description,sale_status,type,price});
        console.log("category ",post)
        return FormData(post)

    }
    async CreateUser(userInputs){
               
      const {username, id}= userInputs
     
      const user = await this.repository.CreateUser({id,username})
      console.log("post service",user)
       

     
      return FormData(user)


  
}
   async addFav(inputData){
    const {user,post}=inputData;
    const fav = await this.repository.addFav({user,post});
    return FormData(fav)
   }
   async getFav(inputData){
    const {user}=inputData;
    const fav = await this.repository.getFav({user});
    return FormData(fav)
   }
    async deleteFav(inputData){
        const {favPost}= inputData;
        const fav = await this.repository.deleteFav({favPost})
        return FormData(fav)

    }
   
}
module.exports = FavoriteServices;