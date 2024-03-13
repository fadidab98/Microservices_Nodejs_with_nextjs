const { models: { User } } = require('../');
const { Op } = require('sequelize');


//Dealing with data base operations
class UserRepository {
  async SignUp({ username, email, password, mobile }) {

      console.log(username, email, password, mobile)
      const user = await User.create({
        username,
        email,
        password,
        mobile
      });
      
      console.log("from Repository",user)

      return user;
    
  }
  async CreateUser({ username, email, password, mobile,role }) {

    console.log(username, email, password, mobile,role)
    const user = await User.create({
      username,
      email,
      password,
      mobile,
      role
    });
    
    console.log("from Repository",user)

    return user;
  
}
  async FindUser({email}){
    const user = await User.findOne({where:{email:email}})
    return user
  }
  async UserCounts(){
    const count = await User.count()
    return count
  }

 async getAllUsers(inputsData){
  const {search,limit,offset}=inputsData

  const users = await User.findAll({where: {
    [Op.or]: [
      { username: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } }
    ]
    
  },limit:limit,offset:offset})

  return users
 }
 async showUser(id){
  const user = await User.findOne({where:{id:id}})
  return user
 }
  async getUserIds(){
    const ids = await User.findAll({ attributes: ['id']})
    return ids
  } 
  async deleteUser(id){
    const deletedUser = await User.destroy({where:{id:id}})
    return deletedUser
  }

}

module.exports= UserRepository;