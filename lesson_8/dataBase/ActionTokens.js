const {Schema, model} = require('mongoose');

const emailActions = require('../enums/email-action.enum');


const ActionTokensShema  = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },

    actionToken: {
        type: String,
        required: true,
    },

    actionType: {
        type: String,
        enum: Object.values(emailActions),
        required: true,
    },


}, {timestamp: true});

module.exports = model('action_tokens', ActionTokensShema);