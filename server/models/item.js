const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sold: {
        type: Number
    },
    image: {
        type: String
    },
    category_list: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    deleted: {
        type: Boolean,
        default: false
    },
    shop_id: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

itemSchema.pre('validate', function(next) {
    if (this.stock < 0) {
        next(new Error(`Stock can't be less than none or 0`));
    } else {
        next();
    }
});

const Item = mongoose.model('Item', itemSchema)
module.exports = Item