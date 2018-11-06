const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required']
    },
    itemList: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;