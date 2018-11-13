const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    item_list: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
})


const Category = mongoose.model('Category', categorySchema)
module.exports = Category