const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const dotenv = require  ('dotenv')
const amqplib = require ("amqplib");
const e = require('express');

const config = dotenv.config()
  const GenerateSalt = async () => {
    return await bcrypt.genSaltSync(10);
  };
  
  const GeneratePassword = async (password, salt) => {
    return await bcrypt.hashSync(password, salt);
  };
  
 const GenerateSignature = async (payload) => {
    try {
      return await jwt.sign(payload, process.env.APP_SECRET, { expiresIn: "1d" });
    } catch (error) {
      
      return error;
    }
  };
  const VaildatePassword = async (inputPassword,dbPassword)=>{
    
    return await bcrypt.compare(inputPassword,dbPassword);

  }

  

 const ValidateSignature = async (req) => {
    try {
      let payload
      console.log("signature :", req);
      console.log("access :",req.cookies);

      if(req.cookies.access_token){
         payload = await jwt.verify(req.cookies.access_token, process.env.APP_SECRET);
         console.log("user :",payload);
         req.user = payload;
         return true;

      }else if(req.get("Authorization")){
        
         payload = await jwt.verify(req.get("Authorization").split(" ")[1], process.env.APP_SECRET);
         console.log("user :",payload);
         req.user = payload;
         return true;


      }else{return false}
     
    } catch (error) {
     
      return false;
    }
  };




 const FormData=(data)=>{
    if(data){
        
       return data
    }else{
        return null
    }
  }
    const  CreateChannel = async () => {
      try {
        const connection = await amqplib.connect("amqps://ahlrmnop:oGIt69ZTyGz866RzabaTbfgrX8_3qEQM@sparrow.rmq.cloudamqp.com/ahlrmnop");
        const channel = await connection.createChannel();
        console.log("================== Consuming POST  service ==================");
    
         await channel.assertQueue("USER")
         return channel
      } catch (err) {
        throw err;
      }
    };
    
    const SendToQueue = async(channel, To_Service, data) => {
    
      try{
     await channel.sendToQueue(
        To_Service,
        Buffer.from(
            JSON.stringify({
              data
            })
        )
    );
       }catch(err)
      {
        throw err;
      }
    };
    const consumeServices =async(channel,From_Service)=>{
      try{
        await channel.consume(From_Service, (data) => {
            users= JSON.parse(data.content);
          
        });
         } catch (err)
        {
        throw err;
        }

    }

module.exports = {FormData,GenerateSalt,GenerateSignature,VaildatePassword,GeneratePassword,ValidateSignature,CreateChannel,SendToQueue,consumeServices}