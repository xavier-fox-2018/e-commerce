const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema ({
  name : String,
  description: String,
  category: String,
  price : Number,
  ratings : [Number],
  reviews : [String],
  imageUrl: String,
  createdBy: Schema.Types.ObjectId
})

const Item = mongoose.model('item', itemSchema);

module.exports = Item;

