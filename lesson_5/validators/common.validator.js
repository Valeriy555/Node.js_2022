const Joi = require("joi");

const {constant} = require("../configs");

module.exports = {
    nameValidator: Joi.string().alphanum().min(2).max(100).required(),
    ageValidator: Joi.number().integer().min(1).max(130),
    emailValidator: Joi.string().regex(constant.EMAIL_REGEX).lowercase().trim(),
    passwordValidator: Joi.string().regex(constant.PASSWORD_REGEX).required().trim()
}