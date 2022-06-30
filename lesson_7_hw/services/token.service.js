const jwt = require('jsonwebtoken');
const {CustomError} = require("../errors");
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require("../configs/configs");
const {configs} = require("../configs");
const {tokenTypeEnums} = require("../enums");

function generateAuthToken(payload = {}) {
    const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

    return {
        access_token,
        refresh_token
    }
}

function checkToken(token = '', tokenType = tokenTypeEnums.ACCESS) {
    try {
        let secret;

        if (tokenType === tokenTypeEnums.ACCESS) secret = configs.ACCESS_TOKEN_SECRET;
        if (tokenType === tokenTypeEnums.REFRESH) secret = configs.REFRESH_TOKEN_SECRET;
        return jwt.verify(token, secret);
    } catch (e) {
        throw new CustomError(`Token not valid`, 401);
    }

}

module.exports = {
    checkToken,
    generateAuthToken,
}