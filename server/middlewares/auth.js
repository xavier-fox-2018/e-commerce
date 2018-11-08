const Helper = require('../helper/index')
const User = require('../models/user')

function checkAuthentication ( req, res, next ) {
    let jToken = JSON.parse(req.headers.autorization)
    let decode = Helper.decodeJws( jToken.jToken )
    User.findById(decode.id)
    .then( user => {
        if ( user ) {
            console.log(`lewat checkAuthorize`)
            next()
        } else {
            res.status(500).json("error, please contact developer!")
        }  
    })
    .catch( err => {
        console.log( err )
    })  
}

module.exports = checkAuthentication