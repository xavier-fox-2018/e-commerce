const mongoose = require('mongoose')

const Schema = mongoose.Schema

const couponSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  coupons: [{
    code: String,
    discount: Number
  }]
}, {
  timestamps: true
})

const Coupon = mongoose.model('Coupon', couponSchema)


module.exports = Coupon