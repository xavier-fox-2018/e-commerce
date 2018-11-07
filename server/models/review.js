const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Product = require('../models/product')

const reviewSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: [true, 'Please create a meaningful review']
  },
  rating: {
    type: Number,
    min: [1, 'Minimun rating is 1 (one) star'],
    max: [5, 'Max rating is 5 (five) stars'],
    required: [true, 'Please give a rate to the product']
  }
}, {
  timestamps: true
})

reviewSchema.post('save', function(doc) {
  Product.findByIdAndUpdate(doc.product, {
    $push: {reviews:doc._id}
  })
  .then((result) => {
    console.log('success push review to product')
  }).catch((err) => {
    console.log('updatein  ERROR in hook', err)
  });

})



const Review = mongoose.model('Review', reviewSchema)

module.exports = Review