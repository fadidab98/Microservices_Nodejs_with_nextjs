const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const dotenv = require  ('dotenv')
const amqplib = require ("amqplib");
const DatauriParser = require('datauri/parser.js');
const path = require('path');
const parser = new DatauriParser();
const cloudinary =  require('cloudinary');
cloudinary.v2.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
});
const config = dotenv.config()
module.exports.GenerateSalt = async () => {
    return await bcrypt.genSaltSync(10);
  };
  
  module.exports.GeneratePassword = async (password, salt) => {
    return await bcrypt.hashSync(password, salt);
  };
  
  module.exports.GenerateSignature = async (payload) => {
    try {
      return await jwt.sign(payload, process.env.APP_SECRET, { expiresIn: "1d" });
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  module.exports.VaildatePassword = async (inputPassword,dbPassword)=>{
    
    return await bcrypt.compare(inputPassword,dbPassword);

  }
  module.exports.ValidateSignature = async (req) => {
    try {
      let payload
      console.log("signature :", req);
      console.log("access :",req.cookies);

      if(req.cookies.access_token){
         payload = await jwt.verify(req.cookies.access_token, process.env.APP_SECRET);

      }else if(req.get("Authorization")){
        
         payload = await jwt.verify(req.get("Authorization").split(" ")[1], process.env.APP_SECRET);


      }
      console.log("user :",payload);
      req.user = payload;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  module.exports.FormData=(data)=>{
    if(data){
        console.log(data)
       return data
    }else{
        return null
    }


}
module.exports.uploadImageToCliudinary = async(file64)=>{
  console.log(file64)

  const image = await parser.format(path.extname(file64.originalname).toString(),file64.buffer);

 const imageurl= await cloudinary.uploader.upload(image.content)
 console.log(image)
return imageurl.secure_url.toString()
}
module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect("amqps://ahlrmnop:oGIt69ZTyGz866RzabaTbfgrX8_3qEQM@sparrow.rmq.cloudamqp.com/ahlrmnop");
    const channel = await connection.createChannel();
    console.log("================== Consuming Notification  service ==================");

     await channel.assertQueue("Notification")
    return channel

  } catch (err) {
    throw err;
  }
};
module.exports.Operation = async(channel,service,msg,preload,info) =>{
  switch(preload){
    case 'ADD_USER':
      const{id,role,username}=info
      const newUser =  await service.CreateUser( {id,role,username});
      channel.ack(msg);
        channel.sendToQueue(
            "USER",
            Buffer.from(JSON.stringify({ newUser }))
        );
        break;
        case 'ADD_CATEGORY':
          
          const newCategory =  await service.CreateCategory( info);
          channel.ack(msg);
          channel.sendToQueue(
              "CATEGORY",
              Buffer.from(JSON.stringify({ newCategory }))
          );
          break;
          

  }

}
/* add preload to add data */
module.exports.SubscribeMessage =  async(channel, service) => {
try{
  console.log("Consuming Notification service 4 ");
 
 await channel.consume("Notification",async(msg) => {
    if(msg){
      console.log("Consuming Notification service 4");
      console.log("Consuming Notification service",JSON.parse(msg.content));

      const { preload} =  JSON.parse(msg.content).data;
      const { info} =  JSON.parse(msg.content).data;
      await this.Operation(channel,service,msg,preload,info)
     
        console.log(preload)
       
        
     
     
     
    }
 
})  
}catch(error){
  console.log(error)
}
   
 

};
module.exports.SendToQueue = async(channel, To_Service, data) => {
  console.log("data",data)
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
module.exports.consumeServices =async(channel,From_Service)=>{
  try{
    await channel.consume(From_Service, (data) => {
      console.log("mqp",data)

        info= JSON.parse(data.content);
    });
     } catch (err)
    {
    throw err;
    }

}
