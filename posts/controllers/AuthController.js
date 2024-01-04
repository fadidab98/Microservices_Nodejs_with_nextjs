const CustomerMessage = require ("../errorMessages/Customer.js")
const { FormData, GenerateSignature } = require ("../utils/index.js")
const CustomerService = require ("../services/PostService.js")
const { ValidationError, ConflictError } = require("../utils/errors/app-errors.js")
const registerValidation = require("../validation/registerValidation.js")
const loginVaildation = require("../validation/loginVaildation.js")



module.exports = {login,register}