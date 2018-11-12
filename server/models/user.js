const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  name: String,
  email: String,
  role: String,
  password: String,
  items:[{
    type: Schema.Types.ObjectId,
    ref: 'item'
  }]
})

// userSchema.post('save', function(doc) {
//   Cart.create({
//     items: []   
//   })
//   .then(newcart=> {
//     User.update({
//       _id:doc.id
//     }, {
//       cartId:newcart._id
//     })
//     .then(user=> {
//       console.log(user);
//     })
//   })
//   .catch(err => console.log(err))
// })

// userSchema.post('findOneAndRemove', function (doc){
//   Cart.findByIdAndRemove(doc.cart)
//   .then(res => console.log(res))
//   .catch(err => console.log(err))
// })

const User = mongoose.model('User', userSchema);

module.exports = User;