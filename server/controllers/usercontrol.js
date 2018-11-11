require('dotenv').config()
const User = require('../models/user')
const Cart = require('../models/cart')
const Transaction = require('../models/transaction')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')




class UserController {

  static createUserLocal(req, res, next) {
    User.create({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      password: req.body.password,
      OAuth: false
    })
      .then(user => {
        Cart.create({
          userId: user._id,
          products: []
        })
        .then(cart => {
          res.status(201).json({
            result: user,
            error: null
          })
        })
        .catch(error => {
          res.status(500).json({
            error_message: 'failed to create new cart'
          })
        })
      })
      .catch(error => {
        if (error.errors.email) {
          res.status(400).json({
            result: null,
            error: {
              error_code: error.errors.email.properties.error_code,
              message: error.errors.email.message
            }
          })
        } else if (error.errors.password) {
          res.status(400).json({
            result: null,
            error: {
              error_code: error.errors.password.message,
              message: 'password cannot be empty'
            }
          })
        } else {
          res.status(500).json({
            result: null,
            error: error
          })
        }
      })
  }
  static loginUserLocal(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(data => {
        if (data) {
          if (bcrypt.compareSync(req.body.password, data.password)) {
            let token = jwt.sign({
              id: data._id,
              role: data.role,
              name: data.name,
              email: data.email
            }, process.env.JWT_SECRET)
            res.status(200).json({
              result: {
                message: 'successfully logged in',
                role: data.role,
                token
              },
              error: null
            })
          } else {
            res.status(400).json({
              result: null,
              error: {
                error_code: 'WRONG_PASSWORD',
                message: 'wrong password'
              }
            })
          }
        } else {
          res.status(404).json({
            result: null,
            error: {
              message: 'email is not registered'
            }
          })
        }
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
  static getCart (req, res, next) {
    Cart.findOne({userId: req.auth_user.id}).populate('products')
    .then(data => {
      res.status(200).json({
        result: data,
        error: null
      })
    })
    .catch(error => {
      res.status(500).json({
        result: null,
        error: error
      })
    })
  }
  static addToCart (req, res, next) {
    Cart.findOneAndUpdate({userId: req.auth_user.id}, {
      $push: {
        products: req.body.productId
      }
    })
    .then(data => {
      return  Cart.findOne({userId: req.auth_user.id}).populate('products')
    })
    .then(data => {
      res.status(200).json({
        result: data,
        error: null
      })
    })
    .catch(error => {
      res.status(500).json({
        result: null,
        error: error
      })
    })
  }
  static removeFromCart (req, res, next) {
    Cart.findOne({userId: req.auth_user.id})
    .then(data => {
      let filtered = data.products.filter(value => value != req.body.productId )
      data.products = filtered
      return data.save()
    })
    .then(data => {
      return  Cart.findOne({userId: req.auth_user.id}).populate('products')
    })
    .then(data => {
      res.status(200).json({
        result: data,
        error: null
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        result: null,
        error: error
      })
    })
  }
  static checkout (req, res, next) {
    Transaction.create({
      userId: req.auth_user.id,
      products: req.body.products,
      totalPrice: req.body.totalPrice,
      purchaseDate: new Date()
    })
    .then(data => {
      return Cart.findOneAndUpdate({userId: req.auth_user.id}, {
        products: []
      })
    })
    .then(data => {
      return  Cart.findOne({userId: req.auth_user.id}).populate('products')
    })
    .then(data => {
      res.status(200).json({
        result: data,
        error: null
      })
    })
    .catch(error => {
      res.status(500).json({
        result: null,
        error: error
      })
    })
  }


}

module.exports = UserController