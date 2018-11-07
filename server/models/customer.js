const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const customerSchema = new Schema({
  name:  String,
  address: String,
  email:   {
    type : String,
    validate : {
      validator : validator.isEmail
    }
  },
  phone: String,
  password : String
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

