const userModels = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
class Users{
    static addUsers(req,res){
        let hash = bcrypt.hashSync(req.body.password,salt)
        userModels.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: hash,
            rule: "customers"
        })
        .then(data=>{
            res.status(200).json({
                message: 'successfully added',
                data: data
            })
        })
        .then(err=>{
            res.status(500).json({
                message:err
            })
        })

    }
    static login(req,res){
        userModels.findOne({
            username: req.body.username
        })
        .then(data=>{
            let passResult = bcrypt.compareSync(req.body.password,data.password)
            if(passResult === true){
                let encode = {
                    username: data.username,
                    email: data.email
                }
                try {
                    let tokenJwt = jwt.sign(encode, 'rahasia')
                    res.status(200).json({
                        tokenJwt : tokenJwt
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
module.exports = Users