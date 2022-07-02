const {emailActionTypeEnums} = require('../enums')

module.exports = {
[emailActionTypeEnums.WELCOME]: {
    subject:'Welcome on board',
    template: 'welcome.hbs',
},
[emailActionTypeEnums.FORGOT_PASSWORD]: {
    subject:'Ops looks like you forgot password',
    template: 'forgot-password',
},
    [emailActionTypeEnums.LOGOUT]: {
        subject:'User was logout',
        template: 'logout',
    },

}