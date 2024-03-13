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
db.models.Post = require('./Post')(sequelize, Sequelize.DataTypes);
db.models.User = require('./User')(sequelize, Sequelize.DataTypes);
db.models.Bazaar = require('./Bazaar')(sequelize, Sequelize.DataTypes);



db.models.User.hasOne(db.models.Bazaar, {
    foreignKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.models.Bazaar.belongsTo(db.models.User, {
    foreignKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.models.Post.hasOne(db.models.Bazaar, {
    foreignKey: 'postid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.models.Bazaar.belongsTo(db.models.Post, {
    foreignKey: 'postid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });


  module.exports= db
