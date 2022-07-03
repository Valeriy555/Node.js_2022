const nodemailer = require("nodemailer");
const EmailTemplates = require("email-templates"); // преображает pug в html
const path = require('path')

const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require("../configs/configs");
const emailTemplates = require("../email-templates");
const {CustomError} = require("../errors");

module.exports = {
    sendMail: async (userMail = '', emailAction = '', locals = {}) => {
        const templateParser = new EmailTemplates({
            views: {root: path.join(process.cwd(), 'email-templates')}
        });


        const templateInfo = emailTemplates[emailAction];

        if (!templateInfo) {
            return new CustomError(`Wrong email action`, 500);
        }

        locals.frontendURL = 'google.com.ua'

       const html = await templateParser.render(templateInfo.template, locals)

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
            html
        })
    }
}