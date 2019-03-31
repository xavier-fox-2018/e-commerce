const jwt = require('jsonwebtoken')

function isAuthenticated(req, res, next) {
    // headers di set di client, ga bisa langsung req.headers woi
    
    // klo ada accessToken -> berarti ada yg login! klo ga ada ga bisa next
    if (req.headers.hasOwnProperty('accesstoken')) {
        let accesstoken = req.headers.accesstoken
        // console.log('accesstoken', accesstoken);
        
        let user = jwt.verify(accesstoken, process.env.JWT_SECRET) // nnti pindah ke middleware!!
        console.log('from middleware', user);
        req.userID = user.id
        next()
    }
    else {

        res.status(400).json('user is not logged in')
    }
}




module.exports = isAuthenticated









// const mongoose = require('mongoose') NOT YETTT!!
// const jwt = require('jsonwebtoken')
// const User = require('../models/user.js')

// class Middleware {
//     static authenticate(req,res,next){
//         let accessToken = req.headers.accessToken
//         if(accessToken){
//             const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
//             req.userId = decoded.id 
//             next()

//         }else{
//             res.status(401).json({
//                 message : 'accessToken not found'
//             })
//         }
//     }

//     static emailUnique(req,res,next){
//         User.findOne({
//             email : req.body.email
//         })
//         .then((result)=>{
//             if(result){
//                 res.status(500).json({
//                     message : 'Email Address Already in Use'
//                 })
//             }else{
//                 next()
//             }
//         })
//         .catch((err)=>{
//             res.status(500).json({
//                 error : err,
//                 message : 'Internal Server Error'
//             })
//         })
//     }
// }

// module.exports = Middleware