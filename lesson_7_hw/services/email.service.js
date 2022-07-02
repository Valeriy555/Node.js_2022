const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const {configs} = require("../configs");
const emailTemplates = require("../emailTemplate");
const {CustomError} = require("../errors");

module.exports = {
    sendMail: async (userMail = '', emailAction = '', context = {}) => {
        const transporter = nodemailer.createTransport({
            from: 'No reply',
            auth: {
                user: configs.NO_REPLY_EMAIL,
                pass: configs.NO_REPLY_EMAIL_PASSWORD
            },
            service: 'gmail',
        });

        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutDir: path.join(process.cwd(),'lesson_7_hw','emailTemplate','layouts'),
                partialsDir: path.join(process.cwd(),'lesson_7_hw','emailTemplate','partials'),
            },
            viewPath: path.join(process.cwd(),'lesson_7_hw','emailTemplate'),
            extName: '.hbs',
        }

        transporter.use('compile', hbs(hbsOptions))


        const templateInfo = emailTemplates[emailAction];
        if (!templateInfo) {
            return new CustomError(`Wrong email action`, 500);
        }

        context.frontendURL = configs.FRONTEND_URL

        return transporter.sendMail({
            to: userMail,
            subject: templateInfo.subject,
            template: templateInfo.template,
            context,
        })
    }
}