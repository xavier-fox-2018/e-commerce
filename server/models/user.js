require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(process.env.MLAB, { useNewUrlParser: true })

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
  },
  role: {
    type: String,
    default: 'customer'
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User