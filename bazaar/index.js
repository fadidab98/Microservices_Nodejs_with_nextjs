

const express =  require("express")
const dotenv =  require('dotenv')
const errorHandler =  require("./middlewares/errorHandler.js")
const db =  require('./models/index.js')
const expressApp= require("./express-app.js")
const port = process.env.PORT ;
const socketIo = require('socket.io');
const http = require('http');
const BazaarService = require("./services/BazaarService.js")



const startServer =async()=>{
  const app = express();

  const service= new BazaarService()
const server = http.createServer(app);
  const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling'],
  });

   
    (async()=>{
        await db.sequelize.sync();
    })();






    /* io */

    io.on("connection",async(socket)=>{
      const postId = socket.handshake.query.postId;

      socket.on("sendOffer",(getData)=>{
        const {userid,price} = getData
        console.log("data 1:", userid,":",price)
          service.createOffer({user:userid,post:postId,price:price})
        
          
      })

      socket.join(postId);
      
      console.log("postId:",postId)
      const minPrice = await service.getMinPrice({id:postId})
      const maxPrice = await service.getMaxPrice({id:postId})
      const PostBazaar = await service.getPostBazaar({id:postId})
      console.log("PostBazaar:",PostBazaar)

      io.to(postId).emit('getBazaar', {
          max:maxPrice,
          min:minPrice,
          post:PostBazaar?PostBazaar.status:0,
          start:PostBazaar?PostBazaar.start:0,
          end:PostBazaar?PostBazaar.end:0
        }
       
      );

      socket.on("disconnect",()=>{
        console.log("disconnected")
      })
  })
  /* end io */
  
  await expressApp(app)
      app.use(errorHandler) 

    server.listen(port,()=>{
    console.log(`customer port ${port}`)
    })
   


}
startServer()





























/* 
 const db =  require('./models/index.js') 
const NotificationService = require("./services/notificationService.js")
const dotenv =  require('dotenv')

const config = dotenv.config()

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require("cors");
const { CreateChannel } = require('./utils/index.js');
const port = process.env.PORT ;


const app = express();

const service= new NotificationService()

  const server = http.createServer(app);
  const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling'],
  });


    (async()=>{
        await db.sequelize.sync();
    })(); 

    
    io.on("connection",(socket)=>{
    
        socket.on("sendNotification",(userid,postid)=>{
          console.log(userid.userid, " : ", userid.postid)
             service.CreateNotification(userid.userid,userid.postid)

           io.emit("getNotification",{
            postid:postid,
            userid:userid
          })
            
        })

        socket.on("disconnect",()=>{
          console.log("disconnexted")
        })
    })
 
 


    server.listen(port,()=>{
    console.log(`customer port ${port}`)
    })
























 import { Server } from "socket.io";

const io = new Server({
  cors:{
    origin:"http://localhost:3000"
  }
});

io.on("connection", (socket) => {
  io.emit("active","user Connected")
  

  socket.on("disconnect",()=>{
    console.log("user disconnected")
  })
  // ...
});

io.listen(5000); */ 