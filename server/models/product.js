const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  stock: Number,
  price: Number,
  img: String,
  categoryId: {type: Schema.Types.ObjectId, ref: 'Category'}
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product