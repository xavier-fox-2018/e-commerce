const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartSchema = new Schema({
  name : {
    type: String,
    required: [true, 'Cart name is required']
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  transactions: [ {type: Schema.Types.ObjectId, ref: 'Transaction'} ],
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
}, {
  timestamps : true
});

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart