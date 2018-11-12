UserController = require('./usercontrol')
TransactionController = require('./transactioncontrol')
ProductController = require('./productcontrol')
class Controller {
  static home (req, res, next){
    res.status(200).json({
      message: 'hello'
    })
  }
}

module.exports = {Controller, UserController, TransactionController, ProductController}