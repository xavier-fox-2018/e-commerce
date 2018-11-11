const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(process.env.MLAB, { useNewUrlParser: true })

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input the category name']
  }
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
