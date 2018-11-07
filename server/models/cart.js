const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/e_commerce', { useNewUrlParser: true })

const CartSchema = new Schema({
  itemId: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  paid: {
    type: Boolean,
    default: false
  }
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart
