const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const userSchema = new Schema({
    name: String,
    password : String,
    email : String,
    role : String,
    cart : []
})

module.exports = Mongoose.model('User', userSchema)