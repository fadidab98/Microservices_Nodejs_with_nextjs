

module.exports =   (sequelize,DataTypes)=>{
    const Notification = sequelize.define('user',
    {
        id:{type :DataTypes.INTEGER ,primaryKey: true},
        username:{type :DataTypes.STRING ,allowNull: false},

       
    },{
        freezeTableName:true
    })
    return Notification
}
