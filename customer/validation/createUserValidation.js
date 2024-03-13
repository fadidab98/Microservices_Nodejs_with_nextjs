const Joi = require("joi")

const validator =(schema)=>(payload)=> schema.validate(payload,{abortEarly:false});
/* register validation */
const validateEmail = (value, helpers) => {
    if (!/\S+@\S+\.\S+/.test(value)) {
      return helpers.error('any.invalid');
    }
  
    // Email is valid
    return value;
  };
const  createUserSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(30).custom(validateEmail).required(),
    password: Joi.string().min(10).required(),
    mobile: Joi.string().min(8).required(),
    role: Joi.number().max(2).required(),
    
});

module.exports = validator(createUserSchema)
