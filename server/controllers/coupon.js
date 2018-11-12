require('dotenv').config()
const Coupon = require('../models/coupon')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')

module.exports = {
  findCoupon: function(req, res) {
    Coupon.findOne({user: req.user.id})
    .then((result) => {
      let found = false
      result.coupons.forEach(coupon=>{
        if(coupon.code === req.params.coupon) {
          res.status(200).json(coupon)
          found = true
        }
      })
      if(!found) res.status(404).json({message: 'coupon code does not exist'});
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  findAll: function(req, res) {
    Coupon.find({})
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  findById: function(req, res) {
    Coupon.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  create: function(req, res) {
    console.log(req.body)//user,{code, discount}
    Coupon.create({
      user: req.user.id,
      coupons: req.body
    })
    .then((result) => {
      res.status(201).json({
        message:'Success created new Coupon',
        status: 'success'
      })
    }).catch((err) => {
      res.status(500).json({
        message: err.message,
        status: 'fail'
      })
    });
  },
  update: function(req, res) {
    // console.log('update body---', req.body)
    Coupon.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  delete: function(req, res) {
    Coupon.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  patch: function(req, res) {
    Coupon.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  }
}