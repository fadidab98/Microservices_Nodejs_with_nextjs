const { Op } = require('sequelize');
const { models: { User } } = require('../');

const { models: { Category } } = require('../');
const { models: { Details } } = require('../');
const { models: { Post } } = require('../');
const { models: { Location } } = require('../');

//Dealing with data base operations
class PostRepository {
  async CreateUser({ username, email, id, mobile }) {

      console.log(username, email, id, mobile)
      const user = await User.create({
        username,
        email,
        id,
        mobile
      });
      
    

      return user;
    
  }
  async allUsers(){
    const users = await User.findAll();
    return users

  }
  
  async allCategory(){
    const categories = await Category.findAll();
    return categories

  }
  async CreateCategory({ id,title,ar_title,description,ar_description,image,status }) {

    console.log(title,ar_title,description,ar_description,image)
    const category = await Category.create({
      id,
      title,
      ar_title,
      description,
      ar_description,
      image,
      status
    });
    
    console.log("from Repository",category)

    return category;
  
}

async CreateDetails({kitchen ,salon ,bedroom ,bathroom ,garden ,floor}){
  const details= await Details.create({
    kitchen,
    salon,
    bedroom,
    bathroom,
    garden,
    floor
  })
  return details
}
async CreatePost({title,ar_title,description,ar_description,type,price,image,detailsid,locationid,userid,categoryid=1,sale_status})
{
  const post = await Post.create({title,ar_title,description,ar_description,type,price,image,detailsid,locationid,userid,categoryid,sale_status})
  return post
}

async CreateLocation({location}){
  const loc = await Location.create({location});
  return loc
}
async getLocations(){
  const loc = await Location.findAll();
  return loc
}

async getAllPosts({limit,offset,type,location,min,max,floor,min_area,max_area}){
  const whereCondition={}
  const whereConditionDetails={}
  if (location) {
    whereCondition.locationid = location;
  }
  if(type){
    whereCondition.type = type;

  }
  if(min && max){
    whereCondition.price={[Op.between]:[min,max]}
  }
  if(min && !max){
    whereCondition.price={[Op.gt]:[min]}
  }
  if(floor){
    whereConditionDetails.floor= floor
  }
  console.log("whereConditionDetails : ",whereConditionDetails)
  
  /* 
  if(min_area && max_area){
   
    whereConditionDetails.area={[Op.between]:[min_area,max_area]}
  }
  if(min_area && !max_area){
   
    whereConditionDetails.area={[Op.gt]:[min_area]}
  } */
  console.log("condition ",whereConditionDetails)
  const posts = await Post.findAll({where:whereCondition,include:[{model:Details,where:whereConditionDetails},{model:Location}],limit:limit,offset:offset})
  return posts
}
async getAllDashPost(inputData){
  const {search,limit,offset} = inputData
  const posts = await Post.findAll({where: {
    [Op.or]: [
      { title: { [Op.like]: `%${search}%` } },
      { ar_title: { [Op.like]: `%${search}%` } }

    ]
    
  },include:[{model:Details},{model:Location},{model:User}],limit:limit,offset:offset})
  return posts

}
async PostsDashCount(){
  const count = await Post.count();
  return count
}
async PostsCount({type,location,min,max,floor,min_area,max_area}){
  const whereCondition={}
  const whereConditionDetails={}
  whereCondition.status =1
  if (location) {
    whereCondition.locationid = location;
  }
  if(type){
    whereCondition.type = type;

  }
  if(min && max){
    whereCondition.price={[Op.between]:[min,max]}
  }
  if(min && !max){
    whereCondition.price={[Op.gt]:[min]}
  }
  if(floor){
    whereConditionDetails.floor = floor
  }
  console.log("whereConditionDetails : ",whereConditionDetails)
  const count = await Post.count({where:whereCondition,include:[{model:Details, where:whereConditionDetails},{model:Location}]});
  return count
}
async PostsCounts(){
  
  const count = await Post.count();
  return count
}
async showPost(id){
  const post = await Post.findOne({where:{id:id},include:[{model:Details},{model:Location},{model:Category},{model:User}]})
  return post
 }
  async getPostIds(){
    const ids = await Post.findAll({ attributes: ['id']})
    return ids
  } 
async deletePost(id){
  const deletedPost = await Post.destroy({where:{id:id}})
  return deletedPost
}
async getPostUser(relPost,relUser){
  console.log("data repo :",relPost," : ",relUser)

  const postUser = await Post.findOne({where:{userid:relUser,id:relPost}})
  return postUser
  
}
async userPosts(getData){
  const {userid}= getData;
  const userPosts = await Post.findAll({where:{userid:userid},include:[{model:Details},{model:Location},{model:User}]})
  return userPosts
  
}
async userPost(getData){
  const {userid,postid}= getData;
  const userPost = await Post.findOne({where:{userid:userid,id:postid},include:[{model:Details},{model:Location},{model:User}]})
  return userPost
  
}
async editPost(getData){
  const {post,status}= getData;
  console.log(getData)
  const changePost = await Post.update({status:status},{where:{id:post}})
  console.log(changePost)
  return changePost
}
}

module.exports= PostRepository;