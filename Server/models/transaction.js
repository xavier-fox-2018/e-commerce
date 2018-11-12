const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Market = require('../models/market')
const User   = require('../models/user')

var transactionSchema = new Schema({
  products : 
    [ { name: String, totalItem: Number, totalPrice: Number } ],
  subTotalPrice: {
    type: Number
  },
  deleteByUser: {
    type: Number,
    default: 0
  },
  deleteByMarket: {
    type: Number,
    default: 0
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  market: [{type: Schema.Types.ObjectId, ref: 'Market'}]
}, {
  timestamps : true
});

transactionSchema.post('save', function(response, next) {

  User.findByIdAndUpdate(response.user,
    {$push: {transactions: response._id}}
    )
    .then(() => {
      next()
    })

});

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction