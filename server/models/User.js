const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
})

userSchema.pre('save', function(next){
    if(this.password){
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(this.password, salt)
        this.password = hash
        next()
    } else {
        next()
    }
    this.role = 'user'
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User