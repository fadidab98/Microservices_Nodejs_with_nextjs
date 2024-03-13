

module.exports =   (sequelize,DataTypes)=>{
    const Category = sequelize.define('category',
    {
        id:{type :DataTypes.INTEGER ,primaryKey: true},
        title:{type :DataTypes.STRING ,allowNull: false},
        image:{type :DataTypes.TEXT ,allowNull: false,},
        description:{type :DataTypes.TEXT  ,allowNull: false},
        ar_title:{type :DataTypes.STRING ,allowNull: false},
        ar_description:{type :DataTypes.TEXT ,allowNull: false},
        status:{type:DataTypes.BOOLEAN, defaultValue:false}

       
    },{
        freezeTableName:true
    })
    return Category
}
