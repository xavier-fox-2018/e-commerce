const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/e_commerce', { useNewUrlParser: true })

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input the category name']
  }
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
