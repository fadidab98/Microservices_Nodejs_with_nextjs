

const express =  require("express")
const dotenv =  require('dotenv')
const errorHandler =  require("./middlewares/errorHandler.js")
const db =  require('./models/index.js')
const expressApp= require("./express-app.js")
const NotificationService = require("./services/notificationService.js")
const port = process.env.PORT ;
const socketIo = require('socket.io');
const http = require('http');



const startServer =async()=>{
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






    /* io */

    io.on("connection",(socket)=>{
    
      socket.on("sendNotification",async(userid,postid)=>{
        const url = socket.handshake.headers.referer;
        console.log('URL:', url);

        console.log(userid.userid, " : ", userid.postid)
          const notification= await service.CreateNotification(userid.userid,userid.postid,userid.image,userid.username)
          const getAllUsers= await service.getAllUsers()
         console.log("getAllUsers",getAllUsers.length)
          getAllUsers.map((user)=>{
            const userid= user.id
            const notid = notification.dataValues.id
             const notuser = service.CreateNotUse({userid,notid})
             console.log(notuser)
             return notuser
             
          })

         io.emit("getNotification",{
          postid:userid.postid,
          userid:userid.userid,
          username:userid.username,
          image:userid.image
        })
          
      })

      socket.on("disconnect",()=>{
        console.log("disconnexted")
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