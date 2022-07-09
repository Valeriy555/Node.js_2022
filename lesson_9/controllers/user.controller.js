const { userService, passwordService, emailService } = require('../services');
const { userPresenter } = require('../presenters/user.presenter');
const { emailActionTypeEnum } = require('../enums');
const {uploadFile} = require("../services/s3.service");
const {User} = require("../dataBase");

module.exports = {
    findUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers(req.query).exec();

            const usersForResponse = users.map(u => userPresenter(u));

            res.json(usersForResponse);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {

            const { email, password, name } = req.body;

            const hash = await passwordService.hashPassword(password);

            const newUser = await userService.createUser({ ...req.body, password: hash });

            await emailService.sendMail(email, emailActionTypeEnum.WELCOME, { name });

            const userForResponse = userPresenter(newUser);


            console.log('------------------*****---------------------')
            console.log(req.files)
            console.log('------------------*****---------------------')

            const user = await User.createWithHashPassword(req.body);

            const {Location} = await uploadFile(req.files.userAvatar,'user',user._id);

            const userWithPhoto = await User.findByIdAndUpdate(user._id,{avatar: Location}, {new: true} )

            res.status(201).json(userForResponse);
            res.status(201).json(userWithPhoto);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { user } = req;

            const userForResponse = userPresenter(user);

            res.json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const updatedUser = await userService.updateOneUser({ _id: id }, req.body);

            const userForResponse = userPresenter(updatedUser);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { id } = req.params;

            await userService.deleteOneUser({ _id: id })

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};