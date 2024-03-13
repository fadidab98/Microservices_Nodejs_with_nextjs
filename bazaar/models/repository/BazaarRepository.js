const { models: { Post } } = require('..');
const { models: { User } } = require('..');
const { models: { Bazaar } } = require('..');


//Dealing with data base operations
class BazaarRepository {
    async postOffer(getData){
        const {userid,offer,id}= getData;
        const bazaar = await Bazaar.create({userid,price:offer,postid:id});
        return bazaar;

    }
    async CreateUser({id}){
        console.log("user data data : ",id)
        const userid=id.id
        const username = id.username
        const user = await User.create({id:userid,username})
        console.log(user)
        return user




    }
    async getMaxPrice(getData){
        const {id}= getData;
        const bazaar = await Bazaar.max('price',{where:{postid:id}});
        return bazaar;

    }
    async getMinPrice(getData){
        const {id}= getData;
        const bazaar = await Bazaar.min('price',{where:{postid:id}});
        return bazaar;

    }
    async createOffer(getData){
        const {user,post,price} =getData;
        const bazaar = await Bazaar.create({userid:user,postid:post,price});
        return bazaar
    }
    async getPostBazaar(getData){
        const {id} =getData;
        const postBazaar = await Post.findOne({where:{id:id}});
        return postBazaar


    }
    async createBazaar(getData){
        const {postid,start,end}=getData;
        console.log("bazaar : ",postid ,typeof postid," ", start,typeof start, " ",end, typeof end)

        const createBazaar = await Post.create({id:postid,start:start,end:end});
        console.log(createBazaar)
        return createBazaar;
    }
    async getBids(getData){
        const {post}=getData;
        const bids = await Bazaar.findAll({where:{postid:post}})
        return bids
    }
}

module.exports= BazaarRepository;