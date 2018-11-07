const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const {isEmail} = require('validator');


const userSchema = new Schema({
  name: String,
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  },
  email: {
    type: String,
    validate: [{
      validator: isEmail,
      message: 'Invalid email format',
      error_code: 'INVALID_EMAIL'
    },{
      isAsync: true,
      validator: function(value, cb){
        User.findOne({email: value}, function(err, doc){
          cb(!doc)
        })
      },
      message: 'Email already exists!',
      error_code: 'EMAIL_NOT_UNIQUE'
    }]
  },
  password: {
    type: String,
    required: [true, 'EMPTY_PASSWORD'],
  },
  OAuth: Boolean
});
userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;