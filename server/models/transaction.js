const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(process.env.MLAB, { useNewUrlParser: true })

const TransactionSchema = new Schema({
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
  },
  total: {
    type: Number,
    default: 0
  }
})

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction
