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
 
 const ValidateSignature = async (req) => {
    try {
      const signature = req.get("Authorization");
      console.log(signature);
      const payload = await jwt.verify(signature.split(" ")[1], process.env.APP_SECRET);
      req.user = payload;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const uploadImageToCliudinary = async(file64)=>{
    const image = await parser.format(path.extname(file64.originalname).toString(),file64.buffer);

   const imageurl= await cloudinary.uploader.upload(image.content)
  return imageurl.secure_url.toString()
  }

 const FormData=(data)=>{
    if(data){
        console.log("data",data)
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

     await channel.assertQueue("CATEGORY")
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
module.exports = {FormData,ValidateSignature,uploadImageToCliudinary,CreateChannel,SendToQueue,consumeServices}