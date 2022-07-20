const router = require('express').Router();

const { userController } = require('../controllers');
const { commonMiddleware, userMiddleware, authMiddleware, fileMiddleware} = require('../middlewares');

// router.get('/',
//     userMiddleware.isUserQueryValid,
//     userController.findUsers);

router.get('/',
    // userMiddleware.isUserQueryValid,
    userController.findUsersWithPagination);

router.post('/',
    userMiddleware.isUserValidForCreate,
    fileMiddleware.checkUserAvatar,
    userMiddleware.isUserUniq,
    userController.createUser);

router.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getUserById);
router.put('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    fileMiddleware.checkUserAvatar,
    userMiddleware.isUserValidForUpdate,
    userMiddleware.isUserPresent,
    userController.updateUserById);
router.delete('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    userController.deleteUserById);

module.exports = router;
