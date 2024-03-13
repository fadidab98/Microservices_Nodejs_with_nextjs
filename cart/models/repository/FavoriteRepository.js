const { models: { Post } } = require('..');

const { models: { User } } = require('..');
const { models: { Favorite } } = require('..');

//Dealing with data base operations
class FavoriteRepository {
  
    async CreateUser(userInputs){
    const {id,username} = userInputs;
    const user = await User.create({id,username});
    return user;
    }
    async CreatePost(userInputs){
        const {id,image,title,description,ar_title,ar_description,sale_status,type,price}=userInputs;
        const post = await Post.create({id,image,title,description,ar_title,ar_description,sale_status,type,price})
        return post
    }

    async addFav(inputData){
        const {user,post}= inputData;
        console.log("user ",user,"post ",post)
        const fav = await Favorite.create({userid:user,postid:post});
        return fav
    }
    async getFav(inputData){
        const {user}= inputData;
        const fav = await Favorite.findAll({where:{userid:user},include:[{model:Post}]});
        return fav
    }
    async deleteFav(inputData){
        const {favPost}=inputData;
        const fav = await Favorite.destroy({where:{id:favPost}})
        return fav
    }
}

module.exports= FavoriteRepository;