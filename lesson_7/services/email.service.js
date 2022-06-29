const nodemailer = require("nodemailer");

const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require("../configs/configs");
const emailTemplates= require("../email-template/index");
const {CustomError} = require("../errors");

module.exports = {
    sendMail: (userMail= '', emailAction) => {
        const templateInfo = emailTemplates[emailAction];

        if(!templateInfo){
            return new CustomError(`Wrong email action`, 500);
        }

        const transporter = nodemailer.createTransport({
            auth: {
                user: NO_REPLY_EMAIL,
                pass: NO_REPLY_EMAIL_PASSWORD
            },
            service: 'gmail'
        });

        return transporter.sendMail({
            from: 'No reply',
            to: userMail,
            subject: templateInfo.subject,
            html: templateInfo.template
        })
    }
}