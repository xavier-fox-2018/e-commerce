const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: {
    type: String
  },
  // product: {
  //   type: Schema.Types.ObjectId, ref: 'Product',
  //   required: [true, 'category product is required']
  // }
}, {
  timestamps : true
});

const Category = mongoose.model('Category', categorySchema)

module.exports = Category