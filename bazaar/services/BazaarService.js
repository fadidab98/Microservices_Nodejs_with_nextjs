const user = require("../../posts/models/user");
const { FormData } = require("../../posts/utils");
const BazaarRepository = require("../models/repository/BazaarRepository");

class BazaarService {

    constructor(){
        this.repository = new BazaarRepository();
    }
    async postOffer(getData){
        const{userid,offer,id}= getData;
        const bazaar = await this.repository.postOffer({userid,offer,id});
        return FormData(bazaar)
    }
    async CreateUser(id,username){
        const user = await this.repository.CreateUser({id,username});
        return FormData(user)
    }
  
    async getMaxPrice(getData){
        const{id}= getData;
        const bazaar = await this.repository.getMaxPrice({id});
        return FormData(bazaar)
    }
    async getMinPrice(getData){
        const{id}= getData;
        const bazaar = await this.repository.getMinPrice({id});
        return FormData(bazaar)
    }
    async createOffer(getData){
       const  {user,post,price}=getData;
       console.log("data 1:", user,post,price)

       const offer = await this.repository.createOffer({user,post,price})
       return FormData( offer)
    }
    async getPostBazaar(getData){
        const{id}= getData;
        const postBazaar = await this.repository.getPostBazaar({id});
        return FormData(postBazaar)



    }
    async createBazaar(getData){
        const{postid,start,end}=getData;
        const d1 = new Date(start);
        const d2 = new Date(end);

        const createBazaar = await this.repository.createBazaar({postid,start:d1,end:d2})
        return FormData(createBazaar)
    }
    async getBids(getData){
        const {post}=getData;
        const bids = await this.repository.getBids({post});
        return FormData(bids)
    }
}
module.exports = BazaarService;