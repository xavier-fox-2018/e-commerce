const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    password: { type: String, default: null }, // sebaiknya default password apa? null aja
    role: { type: String, default: 'user' },
    // googleUser: { type: Boolean, default: false },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' }
}, {timestamps: true})


const User = mongoose.model('User', userSchema)

module.exports = User