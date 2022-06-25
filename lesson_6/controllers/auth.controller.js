const {generateAuthToken} = require("../services/token.service");
const passwordService = require("../services/password.service");
const OAuth = require("../dataBase/oauth");


module.exports = {
    login: async (req, res, next) => {
        try {

            const {password: hashPassword, _id} = req.user;
            const { password } = req.body;

            await passwordService.comparePassword(hashPassword,password);

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
    }
}