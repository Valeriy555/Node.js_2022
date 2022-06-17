const {fileService, userService} = require("../services");

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
            const newUsers = await userService.createUser();
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

    updateUserById: async (req, res) => {
        const {name, age} = req.body;
        const {userId} = req.params;

        if (age && !Number.isInteger(age) || age < 18) { // если число не целое или меньш 18
            return res.status(400).json('Set valid age')
        }

        if (name && name.length < 3) {
            return res.status(400).json('Set valid age')
        }

        const users = await fileService.reader();
        console.log(users);
        const index = users.findIndex((user) => user.id === +userId);

        if (index === -1) {
            return res.status(400).json(`user with id ${userId} not found`);
        }
        // const updatedUser = {...users[index], ...req.body};
        const updatedUser = Object.assign(users[index], req.body);

        users.splice(index, 1);

        await fileService.writer([...users, updatedUser]);

        res.status(201).json(updatedUser);
    },


    deleteUserById: async (req, res) => {
        const {userId} = req.params;
        const users = await fileService.reader();

        const index = users.findIndex((user) => user.id === +userId);

        if (index === -1) {
            return res.status(400).json(`User with id ${userId} not found`);
        }

        users.splice(index, 1)

        await fileService.writer(users);

        res.sendStatus(204);
    },
}
