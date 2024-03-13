const { models: { Notification } } = require('..');
const { models: { User } } = require('../');
const { models: { NotUser } } = require('../');


//Dealing with data base operations
class NotificationRepository {
    async CreateNotification(){

    }
    async CreateNotification(userid,postid,image,username){
        console.log("data : ",userid)

        const notification = await Notification.create(userid,postid,image)
        return notification

    }
    async CreateUser({id}){
        console.log("user data data : ",id)
        const userid=id.id
        const role = id.role
        const username = id.username
        const user = await User.create({id:userid,role,username})
        console.log(user)
        return user




    }
    async getAllUsers(){
        const users = await User.findAll();
        return users
    }
    async CreateNotUse({userid,notid}){
        const notidcreate = await NotUser.create({userid,notid});
        return notidcreate

    }
    async getNotification(user,number){
        console.log("userid :",user)
        const not = await NotUser.findAll({where:{userid:user},include:[{model:Notification},{model:User}],limit:number})
        console.log("not :",not)

        return not
    }
    async getNotIds(){
        const ids = await NotUser.findAll({ attributes: ['id']})
        return ids
      } 
      async showNot(id){
        const not = await NotUser.findOne({where:{id:id},include:[{model:Notification},{model:User}]})
        return not
       }
}

module.exports= NotificationRepository;