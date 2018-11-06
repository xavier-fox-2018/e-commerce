const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  TransactionId: {
    type: Schema.Types.ObjectId,
    ref: 'Transaction' 
  }
}, {
  timestamps: true
})


const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction