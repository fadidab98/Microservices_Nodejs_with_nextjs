const { Sequelize } = require("sequelize")


module.exports =   (sequelize,DataTypes)=>{

    const Post = sequelize.define('post',
    {
        title:{type :DataTypes.STRING ,allowNull: true},
        description:{type :DataTypes.STRING ,allowNull: true,},
        ar_title:{type :DataTypes.STRING ,allowNull: true},
        ar_description:{type :DataTypes.STRING ,allowNull: true,},
        image:{type :DataTypes.STRING ,allowNull: false},
       /* sub_images:{type :DataTypes.STRING ,allowNull: false}, */
        sale_status:{type :DataTypes.ENUM(0,1)  ,defaultValue:"1"},
        status:{type :DataTypes.ENUM(0,1) ,defaultValue: '0'},
        type:{type :DataTypes.ENUM(0,1) ,defaultValue: '0'},

        categoryid:{type :DataTypes.INTEGER() ,defaultValue: '1'},
        price:{type :DataTypes.STRING ,allowNull: false},
        userid: {
            type: Sequelize.INTEGER,
            references: {
              model: 'user', // Make sure this matches the actual table name
              key: 'id',
            },
            onDelete: 'CASCADE', // This is optional but helps maintain referential integrity
            onUpdate: 'CASCADE', // This is optional but helps maintain referential integrity
          },
       
    },{
        freezeTableName:true
    })
    return Post
}
