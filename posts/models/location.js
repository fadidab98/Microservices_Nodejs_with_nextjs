

module.exports =   (sequelize,DataTypes)=>{
    const Location = sequelize.define('location',
    {
        location:{type :DataTypes.STRING ,allowNull: false},
       
    },{
        freezeTableName:true
    })
    return Location
}
