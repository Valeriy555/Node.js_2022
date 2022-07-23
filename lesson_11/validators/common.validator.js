const Joi = require("joi");

const { constants } = require("../configs");

module.exports = {
    nameValidator: Joi.string().alphanum().min(2).max(100),
    ageValidator: Joi.number().integer().min(1).max(130),
    emailValidator: Joi.string().regex(constants.EMAIL_REGEX).lowercase().trim(),
    passwordValidator: Joi.string().regex(constants.PASSWORD_REGEX).required().trim(),

    pageValidator: Joi.number().integer().min(1).max(130),
    perPageValidator: Joi.number().integer().min(1).max(130),
    searchValidator: Joi.string().alphanum().min(0).max(100),
};