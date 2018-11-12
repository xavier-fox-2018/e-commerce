require('dotenv').config()
const Product = require('../models/product')
const Reviews = require('../models/review')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')

module.exports = {
  findAll: function (req, res) {
    console.log('get all products server')
    Product.find({})
      .populate('userId')
      .populate({path : 'reviews', populate : {path : 'user'}})
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(500).json(err)
      });
  },
  findById: function (req, res) {
    Product.findById(req.params.id)
      .populate('userId')
      .populate({path : 'reviews', populate : {path : 'user'}})
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(500).json(err)
      });
  },
  create: function (req, res) {
    console.log('create body---', req.body)
    Product.create(req.body)
      .then((result) => {
        res.status(201).json({
          message: 'Success created new product',
          status: 'success'
        })
      }).catch((err) => {
        res.status(500).json({
          message: err.message,
          status: 'fail'
        })
      });
  },
  update: function (req, res) {
    // console.log('update body---', req.body)
    Product.findByIdAndUpdate(req.params.id, req.body)
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(500).json(err)
      });
  },
  delete: function (req, res) {
    Product.findByIdAndDelete(req.params.id)
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(500).json(err)
      });
  },
  patch: function (req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body)
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(500).json(err)
      });
  },
  updateQuantity: function (req, res) {
    console.log('in update qty:', req.params.id, req.body)
    Product.findByIdAndUpdate(req.params.id, req.body)
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(500).json(err)
      });
  },
  search: function (req, res) {
    Product.find({
        [
          [req.params.key]
        ]: req.params.val
      })
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(500).json(err)
      });
  },
  filter: function (req, res) {
    console.log(req.query)
    if (req.query.rating) {
      Product.find({'reviews.0': {$exists: true}})
      .populate({path : 'reviews', populate : {path : 'user'}})
      .then((result) => {
        let arr = []
        result.forEach(product=>{
          let len = product.reviews.length
          let total = 0
          product.reviews.forEach(review=>{
            total += review.rating
          })
          if((total/len)>=req.query.rating) {
            arr.push(product)
          }
        })
        res.status(200).json(arr)
      }).catch((err) => {
        res.status(500).json(err)
      });
    } else if (req.query.pricefrom) {
      Product.find({'price': {$gte: req.query.pricefrom, $lte: req.query.priceto}})
      .populate({path : 'reviews', populate : {path : 'user'}})
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(500).json(err)
      });
    } else if (req.query.days) {
      var date = new Date();
      date.setDate(date.getDate() - req.query.days)
      Product.find({'createdAt': {$lte: new Date, $gte: date}})
      .populate({path : 'reviews', populate : {path : 'user'}})
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(500).json(err)
      });
    }
  }
}