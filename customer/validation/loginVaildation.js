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
const  loginSchema = Joi.object({
    
    email: Joi.string().min(3).max(30).custom(validateEmail).required(),
    password: Joi.string().min(10).required(),
    
});

module.exports = validator(loginSchema)
