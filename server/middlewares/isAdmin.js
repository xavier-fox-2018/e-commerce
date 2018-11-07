const User = require('../models/user');
const jwt = require('jsonwebtoken');

function isAdmin(req, res, next) {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    User
      .findById(decoded.id)
      .then(data => {
        if(data.isAdmin) {
          next()
        } else {
          res.status(400).json({
            msg : 'Unauthorized Access'
          })
        }
      })
      .catch(err => {
        json.status(500).json(err)
      })   
}

module.exports = isAdmin;