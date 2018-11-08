const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  itemsId: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  totalPrice: Number,
  purchaseDate: Date
});

const Transaction = mongoose.model('Transaction', userSchema);

module.exports = Transaction