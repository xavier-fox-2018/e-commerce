const User = require('../models/user')

module.exports = (email) => {
  return new Promise((resolve, reject) => {
    User.find({ email: email }, (err, docs) => {
      if (err) throw err
      if (!docs.length) {
        resolve()
      } else {
        reject({ message: 'email already exists!' })
      }
    })
  })
}
