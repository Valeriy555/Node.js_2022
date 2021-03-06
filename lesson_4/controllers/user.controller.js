const {userService} = require("../services");

module.exports = {

    findUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers();
            res.json(users);
        } catch (e) {
            next(e);
        }
    },


    createUser: async (req, res, next) => {
        try {
            const newUsers = await userService.createUser(req.body);
            res.status(201).json(newUsers);
        } catch (e) {
            next(e);
        }
    },


    getUserById: async (req, res, next) => {
        try {
            const {user} = req;
            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedUser = await userService.updateOneUser({_id: id}, req.dateForUpdate)
            res.status(201).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },


    deleteUserById: async (req, res, next) => {

        try {
            const {id} = req.params;
            await userService.deleteOneUser({_id: id})

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
}
