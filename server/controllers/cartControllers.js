const Cart = require('../models/cart')
const mongoose = require('mongoose');
const Item = require('../models/item')

class CartController {

  static create(req, res) {
    Cart
      .findOne({user : req.user.id})
      .then(cart => {
        let itemId = mongoose.Types.ObjectId(req.body.item_id);
        if(cart != null) {
          const result = cart.cartItems.filter(function (data) {
          return itemId.equals(data.item);
        })
        if (result.length == 1) {
          Item
            .findById(itemId)
            .then(data => {
              data.stock -= 1;
              return data.save()
            })
            .then(item => {
              Cart
                .update({
                  'user' : req.user.id,
                  'cartItems.item' : item._id
                }, {
                  '$set': {
                      'cartItems.$.quantity': result[0].quantity + 1,
                      'cartItems.$.subTotal': (result[0].quantity + 1) * item.price
                  }
              })
              .then(function(result) {
                res.status(200).json({
                  msg : 'success add item to cart',
                  result : result
                });
              })
              .catch(function(err) {
                  res.status(500).json(err);
              })   
            })
            .catch(err => {
              res.status(500).json(err)
            })
          
        } else if (result.length == 0) {
          Item
            .findById(itemId)
            .then(item => {
              item.stock -= 1;
              return item.save();
            })
            .then(result => {
              Cart
                .updateOne({
                  user : req.user.id
                }, 
                {
                  $push : {
                    cartItems : {
                      item : itemId,
                      quantity : 1,
                      subTotal : result.price 
                    }  
                  }
                })
                .then(result => {
                  res.status(200).json(result)
                })
                .catch(err => {
                  res.status(500).json(err)
                })
            })
        }
        } else if (cart == null) {
          Item
            .findById(itemId)
            .then(item => {
              Cart
              .create({
                cartItems : [{
                  item : itemId,
                  quantity : 1,
                  subTotal : item.price
                }],
                user : req.user.id,
              })
              .then(data => {
                res.status(200).json(data)
              })
              .catch(err => {
                res.status(500).json(err)
              })
            })
            .catch(err => {
              res.status(500).json(err)
            })

        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static read(req, res) {
    Cart
      .findOne({user: req.user.id}).populate('cartItems.item')
      .then(function(cart) {
            res.status(200).json(cart);
      })
      .catch(function(err) {
            res.status(500).json(err.message);
      });
  }

  static removeItem(req, res) {
    Cart
      .findOne({
        user : req.user.id
      })
      .then (cart => {
        let itemId = mongoose.Types.ObjectId(req.params.id);
        const result = cart.cartItems.filter(function (data) {
          return itemId.equals(data.item);
        })
        Item
          .findById(itemId)
          .then(item => {
            item.stock += result[0].quantity;
            return item.save()
          })
          .then(result => {
            Cart
              .updateOne({user:req.user.id}, {
                "$pull" : {"cartItems" : {"item" : itemId}}
              }, {safe:true, multi:true})
              .then(data => {
                res.status(200).json(data)
              })
              .catch(err => {
                res.status(500).json(err)
              })
          })

      })
  }

}

module.exports = CartController

