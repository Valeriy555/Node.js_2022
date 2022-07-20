const Joi = require('joi');

const { emailValidator, ageValidator, nameValidator,
    pageValidator, perPageValidator, searchValidator} = require("./common.validator");

module.exports = {
    findAll: Joi.object({
        name: nameValidator,
        age: ageValidator,
        email: emailValidator,
        page: pageValidator,
        perPage: perPageValidator,
        search: searchValidator
    }),
};