const axios = require('axios'),
      Item = require('../models/item'),
      User = require('../models/user'),
      Admin = require('../models/admin'),
      Transaction = require('../models/transaction'),
      cart = require('../models/cart'),
      Category = require('../models/category'),
      ObjectId = require('mongodb').ObjectId

const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      url = 'mongodb://localhost:27017',
      dbName = 'maso',
      client = new MongoClient(url);

class UserController {

  // R1
  static findAll(req, res) {
    User.find({})
      .exec((err, result) => {
        err ?
          res.status(500).json({
            message: "Error",
            error: err
          }) :
          res.json({
            message: "Success",
            result: result
          })
      })
  }

  // R2
  static findByCategory(req, res) {
    User.find({ category: req.params.itemCategory })
      .exec((err, result) => {
        err ? 
          res.status(500).json({
          message: "Error",
          error: err
          }) : 
          res.json({
            message: "Success",
            result: result
          })
      })
  }

  // R3
  static findOne(req, res) {
    User.find({ _id: ObjectId(req.params.id) })
      .exec((err, result) => {
        err ?
          res.status(500).json({
            message: "Error",
            error: err
          }) :
          res.json({
            message: "Success",
            result: result
          })
      })
  }

  // C1
  static create(req, res) {
    const inp = req.body
    const newUser = new User({
      name: inp.name,
      price: inp.gender,
      phone: Number(inp.phone),
      email: inp.email,
      password: ,
      salt: String,
      address: String,
      zipCode: Number,
      isLogin: Boolean
    })

    newUser.save()
      .then(result => {
        res.json({
          message: "Success",
          result: result
        })
      })
      .catch(err => {
        res.json(err)
      })
  }

  // U1
  static update(req, res) {
    const inp = req.body
    User.update(
        { _id: ObjectId(req.params.id) },
        { $set: req.body },
        (err, result) => {
          err ?
            res.status(500).json({
              message: "Error",
              error: err
            }) :
            res.json({
              message: "Success",
              result: result
            })
        }
    )
  }

  // D1
  static delete(req, res) {
    User.deleteOne({ _id: ObjectId(req.params.id) },
    (err, result) => {
      err ?
        res.status(500).json({
          message: "Error",
          error: err
        }) :
        res.json({
          message: "Success",
          result: result
        })
    })
  }
}

module.exports = UserController