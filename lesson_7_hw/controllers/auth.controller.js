const {generateAuthToken} = require("../services/token.service");
const passwordService = require("../services/password.service");
const emailService = require("../services/email.service");
const OAuth = require("../dataBase/oauth");
const {WELCOME} = require("../configs");
const {emailActionTypeEnums} = require("../enums");


module.exports = {
    login: async (req, res, next) => {
        try {

            const {password: hashPassword, _id, name} = req.user;
            const {password, email} = req.body;

            await emailService.sendMail('valeragol0506@gmail.com',WELCOME,{userName:name}); // псевдокод для примера
            // await emailService.sendMail(email,WELCOME); реальный код

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
            const {access_token,user} = req;
            const {email, name} = user;

            await OAuth.deleteOne({access_token});

            await emailService.sendMail(email, emailActionTypeEnums.LOGOUT,{name, count: 1})

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },

    logoutAllDevices: async (req, res, next) => {
        try {
            const {_id,email, name} = req.user;

           const {deleteCount} = await OAuth.deleteMany({userId: _id});

            await emailService.sendMail(email, emailActionTypeEnums.LOGOUT,{name, count: deleteCount})

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
}