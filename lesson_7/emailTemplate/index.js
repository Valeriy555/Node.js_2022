const emailActions = require('../configs/email.action.enum')

module.exports = {
[emailActions.WELCOME]: {
    subject:'Welcome on board',
    template: 'welcome.hbs',
},
[emailActions.FORGOT_PASSWORD]: {
    subject:'Ops looks like you forgot password',
    template: 'forgot-password',
}

}