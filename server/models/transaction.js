const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  products: Array,
  totalPrice: Number,
  purchaseDate: Date
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction