const {generateAuthTokens, generateActionToken} = require('../services/token.service');
const {passwordService, emailService} = require('../services');
const {OAuth, ActionTokens, User} = require('../dataBase');
const {emailActionTypeEnum} = require('../enums');


module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id,name} = req.user;
            const {password} = req.body;

            await emailService.sendMail('valeragol0506@gmail.com', emailActionTypeEnum.WELCOME, { name }); //TEST CODE


            await passwordService.comparePassword(hashPassword, password);

            const tokens = generateAuthTokens();

            await OAuth.create({
                userId: _id,
                ...tokens
            })

            res.json({
                user: req.user,
                ...tokens
            });
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token});

            const tokens = generateAuthTokens();

            await OAuth.create({userId, ...tokens});

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {access_token, user} = req;
            const {email, name} = user;

            await OAuth.deleteOne({access_token});

            await emailService.sendMail(email, emailActionTypeEnum.LOGOUT, {name, count: 1});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    logoutAllDevices: async (req, res, next) => {
        try {
            const {_id, email, name} = req.user;

            const {deletedCount} = await OAuth.deleteMany({userId: _id});

            await emailService.sendMail(email, emailActionTypeEnum.LOGOUT, {name, count: deletedCount});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {_id, name} = req.user;
            const actionToken = generateActionToken(emailActionTypeEnum.FORGOT_PASSWORD, {name, _id});

            await ActionTokens.create({
                userId: _id,
                actionToken,
                actionType: emailActionTypeEnum.FORGOT_PASSWORD
            });

            // await emailService.sendMail(email, emailActionTypeEnum.FORGOT_PASSWORD, { name }); // real code

            await emailService.sendMail('valeragol0506@gmail.com',                        // TEST CODE
                emailActionTypeEnum.FORGOT_PASSWORD,
                { name, actionToken});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    setForgotPassword: async (req, res, next) => {
        try {
            const {_id} = req.user;
            const {password} = req.body;

            const hashPassword = await passwordService.hashPassword(password);
            const updatedUser = await User.findByIdAndUpdate(_id, {password: hashPassword}, {new: true});


            await ActionTokens.deleteOne({actionType: emailActionTypeEnum.FORGOT_PASSWORD, userId: _id})
            res.json(updatedUser)
        } catch (e) {
            next(e);
        }
    },
};