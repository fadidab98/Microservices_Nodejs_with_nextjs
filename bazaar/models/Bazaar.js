
const { Sequelize } = require("sequelize")

module.exports =   (sequelize,DataTypes)=>{
    const Bazaar = sequelize.define('bazaar',
    {
      userid:{type :DataTypes.INTEGER() ,defaultValue: '1'},

      postid:{type :DataTypes.INTEGER() ,defaultValue: '1'},
      price:{type:DataTypes.FLOAT,defaultValue:0},
      


       
    },{
        freezeTableName:true
    })
    return Bazaar
}
