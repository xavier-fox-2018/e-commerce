const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  itemsId: {
    id: { type: Schema.Types.ObjectId, ref: 'Item' },
    amount: Number
  },
  totalPrice: Number
});

const Cart = mongoose.model('Cart', userSchema);

module.exports = Cart