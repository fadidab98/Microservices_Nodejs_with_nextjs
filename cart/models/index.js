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
db.models.Favorite = require('./favorite')(sequelize, Sequelize.DataTypes);
db.models.Post = require('./post')(sequelize, Sequelize.DataTypes);
db.models.User = require('./user')(sequelize, Sequelize.DataTypes);

module.exports= db

  /*====================user to Favorite============== */
db.models.User.hasOne(db.models.Favorite,{
    foreignKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  db.models.Favorite.belongsTo(db.models.User,{
    foreignKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
    /*====================user to Favorite============== */
db.models.User.hasOne(db.models.Favorite,{
    foreignKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  db.models.Favorite.belongsTo(db.models.User,{
    foreignKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  /*====================post to Favorite============== */
  db.models.Post.hasOne(db.models.Favorite,{
    foreignKey: 'postid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  db.models.Favorite.belongsTo(db.models.Post,{
    foreignKey: 'postid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
   