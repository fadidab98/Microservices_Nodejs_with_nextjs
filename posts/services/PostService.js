const PostRepository = require ("../models/repository/PostRepository.js");
const { BadRequestError, ValidationError, ConflictError, NOTFoundError } = require("../utils/errors/app-errors.js");
const { FormData,GenerateSalt,GeneratePassword,GenerateSignature, VaildatePassword, uploadImageToCliudinary } = require ("../utils/index.js");
const PostValidation = require("../validation/PostEnValidation.js");

 class PostService {

    constructor(){
        this.repository = new PostRepository();
    }
    async CreateUser(userInputs){
               
            const {username, email, id, mobile}= userInputs
           
            const user = await this.repository.CreateUser({id,username, email,  mobile})
            console.log("post service",user)
             
     
           
            return FormData(user)

      
        
    }
    async CreateCategory(inputData){
        const {id,title,ar_title,description,ar_description,image,status}=inputData

         

        const category = await this.repository.CreateCategory({id,title,ar_title,description,ar_description,image,status});
        console.log("category ",category)
        return FormData(category)

    }
    async createDetails(inputData){
        const {kitchen ,	salon ,	bedroom  ,	bathroom ,	garden ,	floor}= inputData;
        const details = await this.repository.CreateDetails({kitchen ,	salon ,	bedroom  ,	bathroom ,	garden ,	floor})
        return FormData(details)
    }
  async createPost(inputData){
    const {title,ar_title,description,ar_description,type,price,image,detailsid,locationid,userid,categoryid,sale_status}=inputData;
    console.log("imageUrl start")

    const  imageUrl= await uploadImageToCliudinary(image)
    console.log("imageUrl",imageUrl)
    const post = await this.repository.CreatePost({title,ar_title,description,ar_description,type,price,image:imageUrl,detailsid,locationid,userid,categoryid,sale_status})
    return FormData(post)
  }
  async createLocation({location}){
    const loc = await this.repository.CreateLocation({location})
    return FormData(loc)
  }
<<<<<<< HEAD
  async getAllPost({limit,offset,type,location,min,max,floor,min_area,max_area}){
    const post= await this.repository.getAllPosts({limit,offset,type,location,min,max,floor,min_area,max_area});
    
=======
  async getAllPost({limit,offset,type,location,min,max,rooms,area}){
    const post= await this.repository.getAllPosts({limit,offset,type,location,min,max,rooms,area});
>>>>>>> 802321716b56db79acec7e66d8e6f9c17aac17eb
    return FormData(post)

  }
  async getLocations(){
    const locations= await this.repository.getLocations();
    return FormData(locations)

  }
<<<<<<< HEAD
  async PostsCount({type,location,min,max,floor,min_area,max_area}){
    const count= await this.repository.PostsCount({type,location,min,max,floor,min_area,max_area});
=======
  async PostsCount({type,location,min,max,rooms,area}){
    const count= await this.repository.PostsCount({type,location,min,max,rooms,area});
>>>>>>> 802321716b56db79acec7e66d8e6f9c17aac17eb
    return FormData(count)

  }
  async PostsCounts(){
    const count= await this.repository.PostsCounts();
    return FormData(count)

  }
  async allUsers(){
    const users = await this.repository.allUsers();
    return FormData(users)
  }
  async allCategory(){
    const categories = await this.repository.allCategory();
    return FormData(categories)
  }
  async showPost(id){
    const post = await this.repository.showPost(id)
    if(!post)throw new NOTFoundError('Post Not Found!')
    return FormData(post);
  }
  async getPostIds(){
    const ids = await this.repository.getPostIds()
    return FormData(ids)
  }
  async getAllDashPost(inputData){
    const {search,limit,offset} = inputData
    const posts= await this.repository.getAllDashPost({search,limit,offset});
    return FormData(posts)
  }
  async PostsDashCount(){
    const count= await this.repository.PostsDashCount();
    return FormData(count)
  }
  async deletePost(id){
    const deletedPost= await this.repository.deletePost(id);
    return FormData(deletedPost)

  }
  async getPostUser(relPost,relUser){
    console.log("data service :",relPost," : ",relUser)

    const getPostUser = await this.repository.getPostUser(relPost,relUser)
    return FormData(getPostUser)
  }
  async userPosts(getData){
    const {userid} = getData;
    const userPosts = await this.repository.userPosts({userid});
    return FormData(userPosts)
  }
  async userPost(getData){
    const {userid,postid} = getData;
    const userPost = await this.repository.userPost({userid,postid});
    return FormData(userPost)
  }
  async editPost(getData){

    const {post,status}= getData;
    const changePost = await this.repository.editPost({post,status});
    return FormData(changePost)
  }
  
}

module.exports = PostService;