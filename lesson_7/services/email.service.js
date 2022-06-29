const nodemailer = require("nodemailer");

const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require("../configs/configs");
const emailTemplates= require("../email-template/index");

module.exports = {
    sendMail: (userMail= '', emailAction) => {
        const templateInfo = emailTemplates[emailAction];

        const transporter = nodemailer.createTransport({
            auth: {
                user: NO_REPLY_EMAIL,
                pass: NO_REPLY_EMAIL_PASSWORD
            },
            service: 'gmail'
        });

        return transporter.sendMail({
            from: 'No reply',
            to: 'valeragol0506@gmail.com',
            subject: 'ITS ALIVE',
            html: '<div style="color:red">HELLO WORLD</div>'
        })
    }
}