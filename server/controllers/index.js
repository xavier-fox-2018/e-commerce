UserController = require('./usercontrol')

class Controller {
  static home (req, res, next){
    res.status(200).json({
      message: 'hello'
    })
  }
}

module.exports = {Controller, UserController}