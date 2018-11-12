const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
    },
    carts: {
        type: String,
        default: []
    },
    transacions: {
        type: String
    },
    profile: {
        type: String,
        default: []
    },
    products: {
        type: String,
        default: []
    },
}, {
    timestamps : true
})

const User = mongoose.model('User', userSchema)

module.exports = User