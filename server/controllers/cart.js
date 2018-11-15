require('dotenv').config()
const Cart = require('../models/cart')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')

module.exports = {
  findAll: function(req, res) {
    Cart.find({user: req.user.id})
    .populate('products')
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  findById: function(req, res) {
    Cart.findById(req.params.id)
    .populate('products')
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  create: function(req, res) {
    // console.log('create body---', req.body)//{}
    Cart.findOne({user:req.body.user})
    .then((result) => {
      if(result === null) {
        Cart.create(req.body)
        .then((result) => {
          res.status(201).json({
            message:'Success created new Cart',
            status: 'success'
          })
        }).catch((err) => {
          res.status(500).json({
            message: err.message,
            status: 'fail'
          })
        });
      } else {
        Cart.findByIdAndUpdate(result._id, {
          $push: {products: req.body.products}
        })
        .then((result) => {
          res.status(201).json({
            message:'Success added and updated Cart',
            status: 'success'
          })
        }).catch((err) => {
          res.status(500).json({
            message: err.message,
            status: 'fail'
          })
        });
      }
    }).catch((err) => {
      res.status(500).json({
        message: err.message,
        status: 'fail'
      })
    });
  },
  update: function(req, res) {
    // console.log('update body---', req.body)
    Cart.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  updateQty: function(req, res) {
    Cart.updateOne(
      { products: req.body.products },
      { $unset: { "products.$": "" } },
      { multi: true })
    .then((result) => {
      Cart.updateOne(
        { products: null },
        { $pull: { products: null } },
        { multi: true }
      )
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(500).json(err)        
      });
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  updateRemove: function(req, res) {
    Cart.updateOne(
      {user: req.body.user},
      {$pull: {products: req.body.products}},
      {multi: true}
    )
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)  
    });
  },
  delete: function(req, res) {
    Cart.findOneAndDelete({user:req.user.id})
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  patch: function(req, res) {
    Cart.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  }
}