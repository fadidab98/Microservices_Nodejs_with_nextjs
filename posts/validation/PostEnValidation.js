const Joi = require("joi")

const validator =(schema)=>(payload)=> schema.validate(payload,{abortEarly:false});
/* register validation */

const  PostValidation = Joi.object({
    title:Joi.string().min(3).required(),
    ar_title:Joi.string().min(3).optional(),
    description:Joi.string().min(3).required(),
    ar_description:Joi.string().min(3).optional(),
    image:Joi.object({
       
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
      }).unknown(),
      images:Joi.array().items(
        Joi.object({
            mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
        }).unknown()
      ),
    type:Joi.string().required(),
    price:Joi.number().precision(2).required(),
    locationid:Joi.number().required(),
   /*  categoryid :Joi.number().required(), */
/*     sale_status:Joi.string().required(), */
    kitchen :Joi.number().required(),
    salon :Joi.number().required(),
    bedroom:Joi.number().required(),
    bathroom:Joi.number().required(),
    garden:Joi.number().required(),
    floor:Joi.number().required(),
    
});

module.exports = validator(PostValidation)
