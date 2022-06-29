const emailActions = require('../configs/email.action.enum')

module.exports = {
[emailActions.WELCOME]: {
    subject:'Welcome on board',
    template: '<div style="color:red">HELLO WORLD</div>',
},
[emailActions.FORGOT_PASSWORD]: {
    subject:'Ops looks like you forgot password',
    template: '<div style="color:red">OOOOOPPS</div>',
}

}