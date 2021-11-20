//this module is used to check of the user's data in register matche the schema of Mongoose.
const Joi = require('@hapi/joi');
const { login } = require('./userController');

const registerValidate = (data) => {
    const schemaRegister = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(6).max(100),
    })

    return schemaRegister.validate(data);
}

const loginValidate = (data) => {
    const schemaLogin = Joi.object({
        email: Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(6).max(100),
    })

    return schemaLogin.validate(data);
}

module.exports.loginValidate = loginValidate;
module.exports.registerValidate = registerValidate;