const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  name:  String,
  address: String,
  email:   {
    type : String,
    validate : {
      validator : validator.isEmail
    },
    unique : true
  },
  password : String,
  isAdmin : Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;

