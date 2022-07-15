const {Schema, model} = require('mongoose');


const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },

    age:{
        type: Number,
        required: true

    },

    password:{
        type: String,
        required: true
    },

    avatar: String,

}, {timestamp:true});

module.exports = model('user',UserSchema);