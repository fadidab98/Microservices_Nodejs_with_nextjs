const SettingRepository = require ("../models/repository/SettingRepository.js");
const { BadRequestError, ValidationError, ConflictError, NOTFoundError } = require("../utils/errors/app-errors.js");
const { FormData, uploadImageToCliudinary} = require ("../utils/index.js");

 class SettingServices {

    constructor(){
        this.repository = new SettingRepository();
       
      
    }
   /* services hier */
   async  getArSetting() {
    const setting = await this.repository.getArSetting()
    return FormData(setting)
    
   }
   async  getSetting() {
    const setting = await this.repository.getSetting()
    return FormData(setting)
    
   }
}
module.exports = SettingServices;