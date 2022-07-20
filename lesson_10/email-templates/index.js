const {emailActionTypeEnum} = require('../enums')

module.exports = {
    [emailActionTypeEnum.WELCOME]: {
        subject: 'Weclome on board',
        template: 'welcome'
    },

    [emailActionTypeEnum.FORGOT_PASSWORD]: {
        subject: 'Opps looks like you forgot password',
        template: 'forgot-password'
    },


    [emailActionTypeEnum.LOGOUT]: {
        subject: 'User was logout',
        template: 'logout'
    },
}