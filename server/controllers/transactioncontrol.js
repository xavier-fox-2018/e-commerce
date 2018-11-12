const Transaction = require('../models/transaction')

class TransactionController {

  static getAll (req, res, next) {
    Transaction.find().sort('-purchaseDate').populate('userId')
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

  static getById (req, res, next) {
    Transaction.findById(req.params.id).populate('userId')
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

  static getByUser (req, res, next) {
    Transaction.find({userId: req.auth_user.id}).sort('-purchaseDate').populate('userId')
    .then(data => {
      res.status(200).json({
        result: data[0],
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

module.exports = TransactionController