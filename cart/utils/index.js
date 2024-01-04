const jwt = require ('jsonwebtoken');
const dotenv = require  ('dotenv')
const DatauriParser = require('datauri/parser.js');
const path = require('path');
const parser = new DatauriParser();
const config = dotenv.config()
const amqplib = require("amqplib")
const cloudinary =  require('cloudinary');
cloudinary.v2.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
});
 
module.exports.ValidateSignature = async (req) => {
  try {
    const parsedObject = req.headers?.cookie ? req?.headers?.cookie.split(';').reduce((acc, pair) => {
      const [key, value] = pair.split('=');
      acc[key] = value;
      return acc;
    }, {}): {};
    console.log("headers :",req.headers?.cookie)
    console.log("cookie :",req.get("Cookie"))
    console.log("Auth : ",req.get("Authorization"))
    console.log("parsedObject : ",parsedObject)

    let preload;

    if(parsedObject["access_token"] != undefined||parsedObject[" access_token"] != undefined){
       payload = await jwt.verify(parsedObject["access_token"]?parsedObject["access_token"]:parsedObject[" access_token"], process.env.APP_SECRET);

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

  module.exports.uploadImageToCliudinary = async(file64)=>{
    const image = await parser.format(path.extname(file64.originalname).toString(),file64.buffer);

   const imageurl= await cloudinary.uploader.upload(image.content)
  return imageurl.secure_url.toString()
  }

  module.exports.FormData=(data)=>{
    if(data){
        console.log("data",data)
       return data
    }else{
        return null
    }
}
module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect("amqps://ahlrmnop:oGIt69ZTyGz866RzabaTbfgrX8_3qEQM@sparrow.rmq.cloudamqp.com/ahlrmnop");
    const channel = await connection.createChannel();
    console.log("================== Consuming Favorite  service ==================");

     await channel.assertQueue("FAVORITE")
     return channel
  } catch (err) {
    throw err;
  }
};

module.exports.Operation = async(channel,service,msg,preload,info) =>{
  switch(preload){
    case 'ADD_USER':
      const{id,username}=info
      const newUser =  await service.CreateUser( {id,username});
      channel.ack(msg);
        channel.sendToQueue(
            "USER",
            Buffer.from(JSON.stringify({ newUser }))
        );
    break;
    case 'ADD_POST':
         
          const newPost =  await service.CreatePost(info);
          channel.ack(msg);
        
    break;
    case 'ADD_LOCATION':
      await service.CreateLocation(info);
      channel.ack(msg);
        
    break;

  }

}
/* add preload to add data */
module.exports.SubscribeMessage =  async(channel, service) => {
try{
  console.log("Consuming Favorite service 5 ");
 
 await channel.consume("FAVORITE",async(msg) => {
  console.log("Consuming Favorite service5");
    if(msg){
      console.log("Consuming Favorite service5");
      console.log("Consuming Favorite service",JSON.parse(msg.content));

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
