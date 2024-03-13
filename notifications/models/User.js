

module.exports =   (sequelize,DataTypes)=>{
    const Notification = sequelize.define('user',
    {
        id:{type :DataTypes.INTEGER ,primaryKey: true},
        role:{type:DataTypes.BOOLEAN, defaultValue:false},
        username:{type :DataTypes.STRING ,allowNull: false},

       
    },{
        freezeTableName:true
    })
    return Notification
}
