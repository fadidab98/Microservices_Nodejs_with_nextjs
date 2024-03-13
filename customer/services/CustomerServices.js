const UserRepository = require ("../models/repository/userRepository.js");
const { BadRequestError, ValidationError, ConflictError, NOTFoundError } = require("../utils/errors/app-errors.js");
const { FormData,GenerateSalt,GeneratePassword,GenerateSignature, VaildatePassword } = require ("../utils/index.js");
const registerValidation = require("../validation/registerValidation.js");

 class CustomerService {

    constructor(){
        this.repository = new UserRepository();
      
    }

    async SignUp(userInputs){
               
            const {username, email, password, mobile}= userInputs
            const salt = await GenerateSalt();
            const generatePassword = await GeneratePassword(password,salt)
           
            const user = await this.repository.SignUp({username, email, password:generatePassword, mobile})
 
             if(!user) throw new  BadRequestError('can not add user')
             const token =await GenerateSignature({email:email,id:user.id})
             
             console.log("user: ",user)
            const data= {
                user,
                "token":token
            }
            return FormData(data)

      
        
    }
    async CheckUser(userInputs){
        const {email}= userInputs;
        const user = await this.repository.FindUser({email})
        
        return FormData(user)

    }
    async LogInUser(userInputs){

         const {email,password}= userInputs
         
        const user = await this.repository.FindUser({email})

            if(!user)throw new NOTFoundError('user not found!')

 
            const dbPassword=user.password
            const inputPassword=password
            const checkPassword = await VaildatePassword(inputPassword,dbPassword)
            if(!checkPassword) throw new  ConflictError('Wrong Password') 
       
            if(checkPassword){
                const token =await GenerateSignature({email:user.email,id:user.id,role:user.role})
                const{password,...user1} = user.dataValues;
                const data ={
                    user:user1,
                    token
                }
                return FormData(data)
            }
      
            
               

            
    }
    async UsersCounts(){
        const count = await this.repository.UserCounts()
        return FormData(count)
    }
    async getAllUsers(userInputs){
        console.log("userInputs ",userInputs)
        const {search,limit,offset}= userInputs
        console.log("userInputs service :",search,limit,offset)

        const users = await this.repository.getAllUsers({search,limit,offset})

        return FormData(users)

    }
    async showUser(id){
        const user = await this.repository.showUser(id)
        if(!user)throw new NOTFoundError('User Not Found!')
        return FormData(user);
     }
      async getUserIds(){
        const ids = await this.repository.getUserIds();
        return FormData(ids);
    }
    async deleteUser(id){
        const deletedUser= await this.repository.deleteUser(id);
        return FormData(deletedUser);
    
      }
    
      async CreateUser(userInputs){
               
        const {username, email, password, mobile,role}= userInputs;
        const salt = await GenerateSalt();
        const generatePassword = await GeneratePassword(password,salt);
       
        const user = await this.repository.CreateUser({username, email, password:generatePassword, mobile,role});

         if(!user) throw new  BadRequestError('can not add user');
         
        const data= {
            user,
        };
        return FormData(data);

  
    
}       

}
module.exports = CustomerService;