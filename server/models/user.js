const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  gender: String,
  phone: Number,
  email: String,
  password: String,
  salt: String,
  address: String,
  zipCode: Number,
  isLogin: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User