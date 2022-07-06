const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');
const {emailActionTypeEnum} = require("../enums");

router.post('/login',
    authMiddleware.isLoginBodyValid,
    authMiddleware.isUserPresentForAuth,
    authController.login);

router.post('/refreshToken',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post('/logoutAllDevices',
    authMiddleware.checkAccessToken,
    authController.logoutAllDevices);

router.post('/forgotPassword',
    authMiddleware.isEmailValid,
    authMiddleware.isUserPresentByEmail,
    authController.forgotPassword);

router.post('/forgotPassword/set',
    authMiddleware.checkActionToken(emailActionTypeEnum.FORGOT_PASSWORD),
    authMiddleware.isUserPresentByEmail,
    authController.setForgotPassword);

module.exports = router;