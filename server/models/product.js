const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  image: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  category: {
    type: String,
    required: [true, 'product category is required']
  },
  name: {
    type: String,
    required: [true, 'product name is required']
  },
  description: {
    type: String,
    default: 'No Description'
  },
  price: {
    type: Number,
    required: [true, 'product price is required']
  },
  quantity: {
    type: Number,
    default:0
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  isDelete: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product