const Mongoose = require('mongoose')
const Schema =  Mongoose.Schema

const categorySchema = new Schema({
    name : String
})

module.exports = Mongoose.model('Category',categorySchema)