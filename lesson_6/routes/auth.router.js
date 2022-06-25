const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const {authMiddleware} = require("../middlewares");

router.post('/login',
    authMiddleware.isUserPresentForAuth,
    authController.login);

router.post('/refreshToken',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

module.exports = router;