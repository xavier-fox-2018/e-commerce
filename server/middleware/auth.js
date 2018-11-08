require('dotenv').config()
const User = require('../models/users')
const jwt = require('jsonwebtoken')

module.exports = {
    isLogin: function(req, res, next){
        let user = jwt.verify(req.headers.token, process.env.JWT_KEY)
        if(user){
            User.findOne({
                email: user.email
            })
            .then((result) => {
                if(result){                    
                    req.decoded = result                                                
                    next()
                } else {
                    res.status(400).json({message: 'Access Forbiden, please login first!'})
                }
            }).catch((err) => {
                res.status(400).json({err: err})
            });
        } else {
            res.status(400).json({message: 'Access Forbiden, please login first!'})   
        }
        
    },
    isAdmin: function(req, res, next){                
        if(req.decoded.isAdmin === true){            
            next()
        } else {            
            res.status(400).json({message: 'Access Forbiden, please login as Admin!'})   
        }
    }

}