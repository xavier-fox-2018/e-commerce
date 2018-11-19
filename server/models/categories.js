const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name must be required'],
        unique: [true, 'Name must be unique']
    }
}, {
    timestamps: true
});

var Category = mongoose.model('Category', categorySchema)

module.exports = Category;