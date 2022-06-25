const userRouter = require('express').Router();

const authController = require('../controllers/auth.controller');
const userMiddleware = require('../middlewares/user.middleware');

userRouter.post('/login',userMiddleware.checkIsUserPresent, authController.login);

module.exports = userRouter;