const userModel = require('../models/user')
const itemModel = require('../models/product')
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
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err.message)
        })
    }



    //for admin
    static addItem(req,res){
        itemModel.create({
            name: req.body.name,
            dascription: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            tag: req.body.tag,
            picture: req.body.picture
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = Controller