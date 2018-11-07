const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const categorySchema = new Schema({
  name:  {
    type : String,
    unique : true,
    required : true
  }
})

categorySchema.plugin(uniqueValidator)

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

