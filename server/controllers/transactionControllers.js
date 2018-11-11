const Cart = require('../models/cart')
const mongoose = require('mongoose')
const Item = require('../models/item')
const Transaction = require('../models/transaction'
)
class TransactionController {


  static create (req, res) {
    Transaction
      .create({
        cartItems : req.body.cartItems,
        user : req.user.id,
        totalPrice : req.body.totalPrice
      })
      .then(data => {
        res.status(200).json(data)
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


}

module.exports = TransactionController

