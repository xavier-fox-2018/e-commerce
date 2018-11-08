const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  salt: String
});

const Admin = mongoose.model('Admin', userSchema);

module.exports = Admin