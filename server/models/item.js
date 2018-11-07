const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/e_commerce', { useNewUrlParser: true })

const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input the item name']
  },
  image: {
    type: String,
    required: [true, 'Please insert the image']
  },
  stock: {
    type: Number,
    required: [true, 'Please input the stock of the item']
  },
  price: {
    type: Number,
    required: [true, 'Please input the price of an item']
  },
  description: {
    type: String
  },
  category: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please input a category']
  }]
})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item
