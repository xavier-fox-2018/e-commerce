const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, default: null },
    email: String,
    password: { type: String, default: null }, 
    address: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    role: { type: String, default: 'user' },
    googleUser: { type: Boolean, default: false }
})


const User = mongoose.model('User', userSchema)

module.exports = User