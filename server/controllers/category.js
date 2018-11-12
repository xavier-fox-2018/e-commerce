require('dotenv').config()
const Category = require('../models/category')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')

module.exports = {
  findAll: function(req, res) {
    Category.find({})
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  findById: function(req, res) {
    Category.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  create: function(req, res) {
    console.log('create body---', req.body)
    Category.create(req.body)
    .then((result) => {
      res.status(201).json({
        message:'Success created new Category',
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
    Category.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  delete: function(req, res) {
    Category.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  patch: function(req, res) {
    Category.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  }
}