const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
  }]
}, {
  timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

// cartSchema.pre('save', function(next) {
//   console.log('pre save cart this--:', this)
//   let data = this
//   Cart.find({})
//   .then((result) => {
//     result.forEach(cart=>{
//       cart.itemList.forEach(item=>{
//         if(item.item == data.itemList.item) {
//           console.log('sama:', item.item, '//', data.itemList.item)
//         }
//       })
//     })
//   }).catch((err) => {
    
//   });
// })



module.exports = Cart