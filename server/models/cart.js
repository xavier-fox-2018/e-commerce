const mongoose = require ('mongoose');
const Schema = mongoose.Schema();

const cartSchema = new Schema ({
  customerId : String,
  items: mongoose.Schema.Types.Array,
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;