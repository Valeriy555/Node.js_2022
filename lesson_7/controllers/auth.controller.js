const {generateAuthToken} = require("../services/token.service");
const passwordService = require("../services/password.service");
const emailService = require("../services/email.service");
const OAuth = require("../dataBase/oauth");


module.exports = {
    login: async (req, res, next) => {
        try {

            const {password: hashPassword, _id} = req.user;
            const {password} = req.body;

            await emailService.sendMail();

            await passwordService.comparePassword(hashPassword, password);

            const tokens = generateAuthToken();

            await OAuth.create({
                userId: _id,
                ...tokens
            })

            res.json({
                user: req.user,
                ...tokens
            })
        } catch (e) {
            next(e)
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token});

            const tokens = generateAuthToken();

            await OAuth.create({userId, ...tokens})

            res.json(tokens)
        } catch (e) {
            next(e)
        }
    },

    logout: async (req, res, next) => {
        try {
            const {access_token} = req;

            await OAuth.deleteOne({access_token});


            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },

    logoutAllDevices: async (req, res, next) => {
        try {
            const {_id} = req.user;

            await OAuth.deleteMany({userId: _id});


            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
}