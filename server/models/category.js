const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  itemsId: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

const Category = mongoose.model('Category', userSchema);

module.exports = Category