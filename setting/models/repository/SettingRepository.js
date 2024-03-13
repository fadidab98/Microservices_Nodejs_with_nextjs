const { models: { Setting } } = require('..');
const { Op } = require('sequelize');

//Dealing with data base operations
class SettingRepository {
  async getSetting(){
    const setting =await Setting.findOne({where:{id:1}});
    return setting
  }
 
}

module.exports= SettingRepository;