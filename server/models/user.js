const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('http://localhost:27017/e-commerce')

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input your name!']
  },
  password: String,
  salt: {
    type: Buffer,
    required: [true, 'Can\'t add a password without salt']
  },
  email: {
    type: String,
    required: [true, 'Please input your email!']
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User