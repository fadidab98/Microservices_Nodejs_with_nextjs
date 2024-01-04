

module.exports =   (sequelize,DataTypes)=>{
    const Notification = sequelize.define('notification',
    {
        postid:{type :DataTypes.INTEGER ,allowNull: false},
        image:{type :DataTypes.STRING ,allowNull: false},
        

       
    },{
        freezeTableName:true
    })
    return Notification
}
