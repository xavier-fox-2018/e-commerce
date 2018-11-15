const mongoose = require('mongoose')
const schema = mongoose.Schema

var userSchema = new schema({
    name: String,
    email: {
        type: String,
        unique:true
    },
    password: String,
    role: String,
    picture: String,
})

var User = mongoose.model('User', userSchema)

module.exports = User