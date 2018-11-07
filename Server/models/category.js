const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: {
    type: String
  }
}, {
  timestamps : true
});

const Category = mongoose.model('Category', categorySchema)

module.exports = Category