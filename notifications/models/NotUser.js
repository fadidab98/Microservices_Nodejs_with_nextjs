
const { Sequelize } = require("sequelize")

module.exports =   (sequelize,DataTypes)=>{
    const Notification = sequelize.define('notuser',
    {
      userid:{type :DataTypes.INTEGER() ,defaultValue: '1'},

      notid:{type :DataTypes.INTEGER() ,defaultValue: '1'},
      status:{type :DataTypes.ENUM('0','1') ,defaultValue: '0'},

       
    },{
        freezeTableName:true
    })
    return Notification
}
