const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema ({
  customerId : String,
  items: [{
    quantity:0,
    type: Schema.Types.ObjectId,
    ref: 'item'}
  ]
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;