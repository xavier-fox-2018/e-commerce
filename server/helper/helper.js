const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()

class helper {
  
  static hashPassword (password) {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);
    return hash;
  }

  static generateToken (email, id, role) {
    return new Promise ((resolve, reject) => {
      const user = {
        'email' : email,
        'id' : id,
        'isAdmin' : role
      }
      const token = jwt.sign(user, process.env.JWT_SECRET);
      token ? resolve(token) : reject('generete token failed')
    }) 
  }

}

module.exports = helper