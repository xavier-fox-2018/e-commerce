const Helper = require('../helper/index')
const User = require('../models/user')

function checkAuthorize ( req, res, next ) {
    let jToken = JSON.parse(req.headers.autorization)
    let decode = Helper.decodeJws( jToken.jToken )
    User.findById(decode.id)
    .then( user => {
        if ( user.role === 'admin' ) {
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

module.exports = checkAuthorize