module.exports = {
    PORT: 3500,
    MONGO_URL:'mongodb://localhost:27017/dec-2021',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'ats',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'rts ',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@gemail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '12345',
}