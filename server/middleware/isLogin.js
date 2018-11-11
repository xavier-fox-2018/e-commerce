const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user.js')

function isLogin (req, res, next) {
    try {
        let decoded = jwt.verify(req.headers.token, process.env.JWT_secret)
        req.decoded = decoded
        //check if email is in database
        User
            .find({
                email:decoded.email
            })
            .then((data) => {
                //if exist
                if(data.length>0) {
                    next ()
                } else {
                    res.status(400).json({message: "User does not exist in DataBase"})
                }
            })
            .catch((err) => {
                res.status(500).json({message: err.message, note: 'Please see console log for details'})
            })
    } catch (err) {
        console.log('From Login')
        res.status(401).json({message:'Please sign in first'})
    }
}

module.exports = isLogin