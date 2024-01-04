

module.exports =   (sequelize,DataTypes)=>{

    const Details = sequelize.define('details',
    {

        kitchen:{type :DataTypes.ENUM('1', '2','3','4','5','6') ,allowNull: false},
        salon:{type :DataTypes.ENUM('1', '2','3','4','5','6') ,allowNull: false},
        bedroom:{type :DataTypes.ENUM('1', '2','3','4','5','6') ,allowNull: false},
        bathroom:{type :DataTypes.ENUM('1', '2','3','4','5','6') ,allowNull: false},
        garden:{type :DataTypes.ENUM('1', '2','3','4','5','6') ,allowNull: false},
        floor:{type :DataTypes.ENUM('0','1', '2','3','4','5','6','7','8','9','10') ,allowNull: false},

       
    },{
        freezeTableName:true
    })
    return Details
}
