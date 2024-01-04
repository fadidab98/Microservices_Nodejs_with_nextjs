const user = require("../../posts/models/user");
const { FormData } = require("../../posts/utils");
const NotificationRepository = require ("../models/repository/NotificationRepository");

class NotificationService {

    constructor(){
        this.repository = new NotificationRepository();
    }

    async CreateNotification(userid,postid,image,username){
        console.log(userid,postid,image,username)
        const notification = await this.repository.CreateNotification({userid,postid,image,username})
        return FormData(notification)
    }
    async CreateUser(id,role,username){
        const user = await this.repository.CreateUser({id,role,username})
        return FormData(user)

    }
    async getAllUsers(){
        const users = await this.repository.getAllUsers()
        return FormData(users)
    }
    async CreateNotUse({userid,notid}){
        const notuser = await this.repository.CreateNotUse({userid,notid})
        return FormData(notuser)

    }
    async getNotification(user,number){
        console.log(user,number)
        const notification = await this.repository.getNotification(user,number)
        return FormData(notification)
    }
    async getNotIds(){
        const ids = await this.repository.getNotIds()
        return FormData(ids)
    }
    async showNot(id){
        const not = await this.repository.showNot(id)
        if(!not)throw new NOTFoundError('Notification Not Found!')
        return FormData(not);
      }


}
module.exports = NotificationService;