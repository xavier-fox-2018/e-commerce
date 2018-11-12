const UserModel = require('../models/user.js')
class Cart {
  
  static deleteOne (req,res) {
    let customerId= res.locals.token._id;
    let itemId= req.body.itemId;
    UserModel.findOneAndUpdate({
      _id: customerId
    }, {
      $pull: {items: itemId}
    })
    .then(result=> {
        res.status(200).json(result.items);
    })
    .catch(err => res.status(500).json(err));
  }
  static deleteAll (req,res) {
    let customerId= res.locals.token._id;
    UserModel.findOneAndUpdate({
      _id: customerId
    }, {
      $pull: {items: {$type:'objectId'}}
    })
    .then(result => {
      console.log(result)
        res.status(200).json(result.items);
    })
    .catch(err => res.status(500).json(err));
  }
  static getAll () {

  }
  static update (req,res) {
    let customerId= res.locals.token._id;
    let itemId= req.body.itemId;
    console.log(customerId,itemId)
    //customer add item to cart
    UserModel.findOneAndUpdate({
      _id: customerId
    }, {
      $push: {items: itemId}
    })
    .then(user=> {
      UserModel.findById(user._id)
      .populate('items')
      .then(result => {
        console.log(result.items[result.items.length-1])
        res.status(200).json(result.items)
      })
    })
  }
}
module.exports = Cart;