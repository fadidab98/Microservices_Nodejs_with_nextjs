

module.exports =   (sequelize,DataTypes)=>{
    const User = sequelize.define('user',
    {
        username:{type :DataTypes.STRING ,allowNull: false},
        email:{type :DataTypes.STRING ,allowNull: false,unique: true,isEmail: true,},
        password:{type :DataTypes.STRING ,allowNull: false},
        role:{type :DataTypes.ENUM('0' , '1'),defaultValue:'0'},
        mobile:{type :DataTypes.STRING ,allowNull: false},
       
    },{
        freezeTableName:true
    })
    return User
}
