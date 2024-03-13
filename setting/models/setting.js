

module.exports =   (sequelize,DataTypes)=>{
    const Setting = sequelize.define('setting',
    {
        seo_title:{type :DataTypes.STRING ,allowNull: false},
        seo_description:{type :DataTypes.TEXT ,allowNull: false,},
        seo_image:{type :DataTypes.TEXT  ,allowNull: false},
        seo_ar_title:{type :DataTypes.STRING ,allowNull: false},
        seo_ar_description:{type :DataTypes.TEXT ,allowNull: false},
        service_one_title:{type :DataTypes.STRING ,allowNull: false},
        service_one_ar_title:{type :DataTypes.STRING ,allowNull: false},

        service_two_title:{type :DataTypes.STRING ,allowNull: false},
        service_two_ar_title:{type :DataTypes.STRING ,allowNull: false},

        service_three_title:{type :DataTypes.STRING ,allowNull: false},
        service_three_ar_title:{type :DataTypes.STRING ,allowNull: false},

        technical_email:{type :DataTypes.TEXT  ,allowNull: false},
        technical_mobile:{type :DataTypes.TEXT  ,allowNull: false},
        bug_email:{type :DataTypes.TEXT  ,allowNull: false},
        bug_email:{type :DataTypes.TEXT  ,allowNull: false},

        footer_description:{type :DataTypes.TEXT  ,allowNull: false},
        footer_ar_description:{type :DataTypes.TEXT  ,allowNull: false},

        contact_address:{type :DataTypes.TEXT  ,allowNull: false},
        contact_email:{type :DataTypes.TEXT  ,allowNull: false},
        contact_mobile:{type :DataTypes.TEXT  ,allowNull: false},
        facebook:{type :DataTypes.TEXT  ,allowNull: false},
        twiter:{type :DataTypes.TEXT  ,allowNull: false},
        instagram:{type :DataTypes.TEXT  ,allowNull: false},
        linkedin:{type :DataTypes.TEXT  ,allowNull: false},
        github:{type :DataTypes.TEXT  ,allowNull: false},
    },{
        freezeTableName:true
    })
    return Setting
}
