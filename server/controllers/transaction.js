require('dotenv').config()
const Transaction = require('../models/transaction')
const Coupon = require('../models/coupon')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')

module.exports = {
  findAll: function(req, res) {
    Transaction.find({})
    .populate('itemList.item')
    .populate('user')
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  findById: function(req, res) {
    Transaction.find({user:req.user.id})
    .populate('itemList.item')
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  create: function(req, res) {
    console.log('create body---', req.body)
    Transaction.create({
      user: req.user.id,
      itemList: req.body.itemList,
      grandTotal: req.body.grandTotal,
      address: req.body.address
    })
    .then((result) => {
      res.status(201).json({
        message:'Success created new Transaction',
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
    Transaction.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  delete: function(req, res) {
    Transaction.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  patch: function(req, res) {
    Transaction.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  }
}