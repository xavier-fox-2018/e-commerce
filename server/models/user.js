const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    password: String,
    cart: {
        type: [{Item: {type: Schema.Types.ObjectId, ref: 'Item'}, qty: Number}],
        default: []
    },
    role: Number
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;