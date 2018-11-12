const mongoose = require('mongoose')
const Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId;
const {generateSalt, hashPassword, compare} = require('../helpers/helper')

const userSchema = new Schema({
    fullName : String,
    email: String,
    password: String,
    access: String,
    balance: {
        type: Number,
        default: 0
    },
    carts: [{
        type: ObjectId,
        ref: 'Cart'
    }]
}, {
    timestamps: true
})

userSchema.pre('save',  function(next) {
    let salt = generateSalt(10)
    let pwd = hashPassword(this.password, salt)
    this.password = pwd
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

