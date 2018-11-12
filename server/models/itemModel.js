const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema ({
    name : {
        type : String
    },
    image_url : {
        type : String
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category'
    },
    description : {
        type : String
    },
    price : {
        type : Number
    },
    stock : {
        type : Number,
        default : 10
    },
    deleted : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

const Item = mongoose.model('Item',itemSchema)

module.exports = Item;