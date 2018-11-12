const mongoose = require('mongoose')
const { genSalt, hashingPassword } = require('../helpers/brcyrpt')
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    name :{
        type :  String,
        required : [true, 'Sorry, name must be filled!']
    },
    item_list : [ {type: Schema.Types.ObjectId, ref : 'Item' }]
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category