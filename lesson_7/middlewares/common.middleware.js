const {Types} = require('mongoose');
const {CustomError} = require("../errors");

module.exports = {
    isIdValid: (req, res, next) => { // проверка на валидность id
        try {
            const {id} = req.params;

            if (!Types.ObjectId.isValid(id)) {
                return next(new CustomError('Not valid ID'))
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};