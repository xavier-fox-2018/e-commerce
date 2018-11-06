const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()


class Controller {
    static signUp (req,res){     
        var salt = bcrypt.genSaltSync(10);
       var hash = bcrypt.hashSync(req.body.password, salt);
        userModel.create({
            name:req.body.name,
            email:req.body.email,
            password: hash,
            role: req.body.role,
            picture: req.body.picture
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err.message)
        })
    }
}

module.exports = Controller