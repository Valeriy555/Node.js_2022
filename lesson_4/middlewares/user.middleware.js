const {CustomError} = require("../errors");
const {userService} = require("../services");

module.exports = {
    isUserPresent: async (req, res, next) => { // проверка на валидность id
        try {
            const {id} = req.params;

            const user = await userService.findOneUser({_id: id});
            if (!user) {
                return next(new CustomError('User not found'))
            }

            req.user = user; // передали юзера в контроллер
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForCreate: async (req, res, next) => { // проверка на валидность id
        try {
            const {name, email, age, password} = req.body;

            if (!age || !Number.isInteger(age) || age < 18) { // если число не целое или меньш 18
                return next(new CustomError('Set valid age'));
            }

            if (!name || name.length < 3) { // если число не целое или меньш 18
                return next(new CustomError('Set valid name'));
            }

            if (!email || !email.includes('@')) { // если число не целое или меньш 18
                return next(new CustomError('Set valid email'));
            }

            if (!password || password.length < 5) { // если число не целое или меньш 18
                return next(new CustomError('Set valid password'));
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForUpdate: async (req, res, next) => { // проверка на валидность id
        try {
            const {name, age} = req.body;

            if (age && !Number.isInteger(age) || age < 18) { // если число не целое или меньш 18
                return next(new CustomError('Set valid age'));
            }

            if (name && name.length < 3) { // если число не целое или меньш 18
                return next(new CustomError('Set valid name'));
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUniq: async (req, res, next) => { // проверка на валидность id
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({ email });
            if (user) {
                return next(new CustomError(`User with email ${email} is exist`,409));
            }

            req.user = user; // передали юзера в контроллер
            next();
        } catch (e) {
            next(e);
        }
    },
};