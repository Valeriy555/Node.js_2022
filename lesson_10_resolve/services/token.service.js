const jwt = require('jsonwebtoken');

const {configs} = require("../configs");
const {CustomError} = require('../errors');
const {tokenTypeEnum, emailActionTypeEnum} = require('../enums');





function generateAuthTokens(payload = {}) {
    const access_token = jwt.sign(payload, configs.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refresh_token = jwt.sign(payload, configs.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

    return {
        access_token,
        refresh_token
    }
}

function checkToken(token = '', tokenType = tokenTypeEnum.ACCESS) {
    try {
        let secret;

        if (tokenType === tokenTypeEnum.ACCESS) secret = configs.ACCESS_TOKEN_SECRET;
        if (tokenType === tokenTypeEnum.REFRESH) secret = configs.REFRESH_TOKEN_SECRET;

        return jwt.verify(token, secret);
    } catch (e) {
        throw new CustomError(`Token not valid`, 401);
    }
}

function generateActionToken(actionType, payload = {}) {
    let secretWord = '';
    let expiresIn = '7d';

    switch (actionType) {
        case emailActionTypeEnum.FORGOT_PASSWORD:
            secretWord = configs.FORGOT_PASS_ACTION_SECRET;
            break;

        default:
            throw new CustomError(`Wrong action type`, 500);

    }

    return  jwt.sign(payload,secretWord, {expiresIn});
}

function checkActionToken(token = '', actionType) {
    let secretWord = '';


    switch (actionType) {
        case emailActionTypeEnum.FORGOT_PASSWORD:
            secretWord = configs.FORGOT_PASS_ACTION_SECRET;
            break;

        default:
            throw new CustomError('Wrong action type', 500);
    }

    return jwt.verify(token, secretWord);
}

module.exports = {
    checkToken,
    checkActionToken,
    generateAuthTokens,
    generateActionToken
}