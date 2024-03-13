

module.exports =   (sequelize,DataTypes)=>{
    const User = sequelize.define('user',
    {
        id:{type :DataTypes.INTEGER ,primaryKey: true},
        username:{type :DataTypes.STRING ,allowNull: false},
        email:{type :DataTypes.STRING ,allowNull: false,unique: true,isEmail: true,},
        mobile:{type :DataTypes.STRING ,allowNull: false},
       
    },{
        freezeTableName:true
    })
    return User
}
