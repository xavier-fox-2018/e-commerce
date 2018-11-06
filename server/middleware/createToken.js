const jwt = require('jsonwebtoken');

function jwtCreate (req,res) {
  const token = jwt.sign(
    res.locals.payload.toObject()
    , process.env.SECRET)
  res.status(200).json({token:token})
}

module.exports = jwtCreate