const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  name: String,
  username: String,
  role: String,
  password: String,
  items: [{
    type:Schema.Types.ObjectId,
    ref: 'item'
  }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;