const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sgMail = require('@sendgrid/mail')

let userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'member' },
    cart: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    deleteAt: { type: Date, default: null },
},{
    timestamps: true
});




const User = mongoose.model('User', userSchema)
module.exports = User
