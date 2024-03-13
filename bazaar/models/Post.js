

module.exports =   (sequelize,DataTypes)=>{
    const Post = sequelize.define('post',
    {
        id:{type :DataTypes.INTEGER ,primaryKey: true},
        start:{type:DataTypes.DATE},
        end:{type:DataTypes.DATE},
        status:{type :DataTypes.ENUM('0','1','2') ,defaultValue: '0',allowNull: true},

       
    },{
        freezeTableName:true
    })
    return Post
}
