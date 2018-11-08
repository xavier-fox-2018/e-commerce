const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema ({
  name : String,
  stock : Number,
  price : Number,
  ratings : [Number],
  reviews : [String]
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

