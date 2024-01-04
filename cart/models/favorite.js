

module.exports =   (sequelize,DataTypes)=>{
    const Favorite = sequelize.define('favorite',
    {
        userid:{type :DataTypes.INTEGER() ,defaultValue: '1'},
        postid:{type :DataTypes.INTEGER() ,defaultValue: '1'},
    },{
        freezeTableName:true
    })
    return Favorite
}
