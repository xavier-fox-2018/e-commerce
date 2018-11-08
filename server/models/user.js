const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cart= require('./cart.js');

const userSchema = new Schema ({
  name: String,
  email: String,
  role: String,
  password: String,
  cart: {
    type:Schema.Types.ObjectId,
    ref: 'cart'
  }
})

userSchema.post('save', function(doc) {
  Cart.create({
    customerId : doc._id,
    items: []   
  })
  .then(newcart=> {
    User.update({
      _id:doc.id
    }, {
      cart:newcart._id
    })
    .then(()=> {
      console.log('after post');
    })

  })
  .catch(err => console.log(err))
})

userSchema.post('findOneAndRemove', function (doc){
  Cart.findByIdAndRemove(doc.cart)
  .then(res => console.log(res))
  .catch(err => console.log(err))
})

const User = mongoose.model('User', userSchema);

module.exports = User;