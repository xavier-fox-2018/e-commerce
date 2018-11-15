const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  itemList: [{
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    qty: {
      type: Number,
      default: 0
    }
  }],
  grandTotal: {
    type: Number
  },
  address: {
    type: String,
    required: [true, 'address is required to ship the products']
  }
}, {
  timestamps: true
})



// transactionSchema.post('save', function(doc) {
//   console.log('hoook transaction')
//   Transaction.find({user: req.user.id})
//   .then((result) => {
//     console.log('result post save transaction', result)
//   }).catch((err) => {
//     console.log('error when finde transaction post save', err)
//   });
// })

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction