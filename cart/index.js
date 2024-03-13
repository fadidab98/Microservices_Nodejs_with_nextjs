const express =  require("express")
const dotenv =  require('dotenv')
const errorHandler =  require("./middlewares/errorHandler.js")
const db =  require('./models/index.js')
const expressApp= require("./express-app.js")
const port = process.env.PORT ;



const startServer =async()=>{
    const app = express();


    (async()=>{
        await db.sequelize.sync();
    })();

    
    await expressApp(app)

    app.use(errorHandler)

    app.listen(port,()=>{
    console.log(`customer port ${port}`)
    })


}
startServer()