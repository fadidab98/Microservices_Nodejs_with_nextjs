

module.exports =   (sequelize,DataTypes)=>{
    const Post = sequelize.define('post',
    {
        id:{type :DataTypes.INTEGER ,primaryKey: true},

        image:{type :DataTypes.STRING ,allowNull: false},
        title:{type :DataTypes.STRING ,allowNull: true},
        description:{type :DataTypes.STRING ,allowNull: true,},
        ar_title:{type :DataTypes.STRING ,allowNull: true},
        ar_description:{type :DataTypes.STRING ,allowNull: true,},
        sale_status:{type :DataTypes.ENUM('0','1')  ,defaultValue:"1"},
        type:{type :DataTypes.ENUM('0','1') ,defaultValue: '0'},
        price:{type :DataTypes.STRING ,allowNull: false},

       
    },{
        freezeTableName:true
    })
    return Post
}
