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
      console.log(error);
      return error;
    }
  };
  const VaildatePassword = async (inputPassword,dbPassword)=>{
    
    return await bcrypt.compare(inputPassword,dbPassword);

  }

  

 const ValidateSignature = async (req) => {
    try {
      const signature = req.get("Authorization");
      console.log(signature);
      const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
      req.user = payload;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };




 const FormData=(data)=>{
    if(data){
        console.log(data)
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
            console.log("mqp",data)
        });
         } catch (err)
        {
        throw err;
        }

    }

module.exports = {FormData,GenerateSalt,GenerateSignature,VaildatePassword,GeneratePassword,ValidateSignature,CreateChannel,SendToQueue,consumeServices}