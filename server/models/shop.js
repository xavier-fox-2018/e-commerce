const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const shopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String,
        required: true
    },
    item_list: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    deleted: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
})

const Shop = mongoose.model('Shop', shopSchema)
module.exports = Shop