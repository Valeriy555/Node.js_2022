const {checkToken, checkActionToken} = require("../services/token.service");
const {OAuth, ActionTokens} = require("../dataBase");
const {CustomError} = require('../errors');
const {userService} = require('../services');
const {authValidator} = require('../validators');
const {tokenTypeEnum} = require('../enums');
const {constants} = require('../configs');

module.exports = {
    checkUserAvatar: async (req, res, next) => {
        try {
            if (!req.files?.avatar) {
                return next();
            }

            const {mimetype, size} = req.files.avatar

            if (size > constants.IMAGE_MAX_SIZE) {
                return next(new CustomError('Max size 3 MB'));
            }

            if (size > constants.IMAGE_MAX_SIZE) {
                return next(new CustomError('Max size 3 MB'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },


}