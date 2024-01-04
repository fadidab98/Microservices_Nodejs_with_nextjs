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
db.models.User = require('./user')(sequelize, Sequelize.DataTypes);
db.models.Category = require('./category')(sequelize, Sequelize.DataTypes);
db.models.Post = require('./post')(sequelize, Sequelize.DataTypes);
db.models.Details = require('./details')(sequelize, Sequelize.DataTypes);
db.models.Location = require('./location')(sequelize, Sequelize.DataTypes);
  /* =======================user with post====================== */

db.models.User.hasOne(db.models.Post, {
    foreignKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.models.Post.belongsTo(db.models.User, {
    foreignKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  /* =======================details with post====================== */
  db.models.Details.hasOne(db.models.Post, {
    foreignKey: 'detailsid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.models.Post.belongsTo(db.models.Details, {
    foreignKey: 'detailsid',

    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
    /* =======================location with post====================== */
    db.models.Location.hasOne(db.models.Post, {
      foreignKey: 'locationid',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    db.models.Post.belongsTo(db.models.Location, {
      foreignKey: 'locationid',
  
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
      /* =======================category with post====================== */
      db.models.Category.hasOne(db.models.Post, {
        foreignKey: 'categoryid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      db.models.Post.belongsTo(db.models.Category, {
        foreignKey: 'categoryid',
    
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
module.exports= db