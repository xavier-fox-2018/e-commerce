// const User = require('../models/user')
const jwt = require('jsonwebtoken')

// function isLogin (req,res,next) {
//   let token = req.headers.token
//   if (token) {
//       jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
//         if (!err) {
//           User.findOne({ username : decoded.username })
//           .then(function (user) {
//             if(user){
//               req.userId = decoded.userId
//               req.accessMarket = user.marketAvailable
//               next()
//             } else {
//               res.status(500).json({
//                 message : `access denied`
//               })
//             }
//           })
//         } else {
//           res.status(500).json({
//               message : `access denied`
//           })
//         }
//       })
//   } else {
//       res.status(500).json({
//           message : `access denied`
//       })
//   }
// }

module.exports = module.exports = {
    isLogin(req,res, next) {
        console.log('ini req', req.headers);
        
        let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
            if ( err ) {
                console.log((err));
                res.status(401).json({
                    message: `You're not a user`
                })
            }
            else {
                req.data = decoded
                console.log(req.data, 'ini isLogin');
                next()
            }
        })
    },
}