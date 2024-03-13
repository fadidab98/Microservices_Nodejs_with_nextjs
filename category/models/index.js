const Sequelize  = require ( "sequelize");
const dotenv = require  ('dotenv')

const config = dotenv.config()

const sequelize = new Sequelize(process.env.DB,process.env.USER,process.env.PASSWORD,{
    host:process.env.HOST,
    port:process.env.DB_PORT,
    dialect:process.env.DIALECT,
})
const db  ={};
db.sequelize=sequelize;



db.models = {};
db.models.Category = require('./category')(sequelize, Sequelize.DataTypes);
module.exports= db