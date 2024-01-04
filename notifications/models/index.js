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
db.models.Notification = require('./Notification')(sequelize, Sequelize.DataTypes);
db.models.User = require('./User')(sequelize, Sequelize.DataTypes);
db.models.NotUser = require('./NotUser')(sequelize, Sequelize.DataTypes);



db.models.User.hasOne(db.models.NotUser, {
    foreignKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.models.NotUser.belongsTo(db.models.User, {
    foreignKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.models.Notification.hasOne(db.models.NotUser, {
    foreignKey: 'notid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.models.NotUser.belongsTo(db.models.Notification, {
    foreignKey: 'notid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });


  module.exports= db
