const jwt = require('jsonwebtoken');

function existToken(req, res, next) {
  let token = req.headers.token;
  if (token=='undefined' || token=='null') return next();        
  console.log('user has token')
  jwt.verify(req.headers.token, process.env.SECRET, function(err, decoded) {
    if (err) {
      res.status(500).json(err);
    }
    else res.send(200).json('user has signed in with jwt token'); 
  })
}


module.exports = existToken;