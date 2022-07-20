const {Schema, model} = require('mongoose');


const OAuthSchema  = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },

    access_token: {
        type: String,
        required: true,
    },

    refresh_token: {
        type: String,
        required: true,
    },


}, {timestamp: true});

module.exports = model('oauth', OAuthSchema);