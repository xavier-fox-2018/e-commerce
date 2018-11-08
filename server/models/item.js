const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  price: Number,
  stock: Number,
  image: String,
  category: String,
  deleted: Boolean
});

const Item = mongoose.model('Item', userSchema);

module.exports = Item