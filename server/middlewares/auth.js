const UserModel = require('../models/UserModel.js')
const jwt = require('jsonwebtoken')
const axios = require('axios')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(GOOGLE_CLIENT_ID)

module.exports = {

    isLogin(req, res, next) {
        let token = req.headers.token

        if (token) {
            jwt.verify(token, process.env.JWTSECRET, function (err, decoded) {
                if (!err) {
                    UserModel.findOne({
                            _id: decoded._id
                        })
                        .then((user) => {
                            req.user = user
                            next()
                        })
                        .catch((err) => {
                            res.status(500).json({
                                message: `Invalid User Creditial`,
                                error : err
                            })
                        })
                } else {
                    res.status(500).json({
                        message: `Invalid User Creditial`,
                        error : err
                    })
                }
            })
        } else {
            res.status(500).json({
                message: `User Creditial Required g1`
            })
        }

    },

    isOwnerOfId(req, res, next) {
        if (req.user.role === 'admin' || req.user._id == req.params.id) {
            next()
        } else {
            res.status(403).json({
              message: `you're not auhtorized for doing this actions`
            })
        }
    },

    isAdmin(req, res, next) {
        
        if (req.user.role === 'admin') {
            next()
        } else {
            res.status(403).json({
              message: `you're not auhtorized for doing this actions`
            })
        }
    },

    isCustomer(req, res, next) {

        if (req.user.role === 'user') {
            next()
        } else {
            res.status(403).json({
              message: `you're not auhtorized for doing this actions`
            })
        }

    },

    googleAuth(req, res, next) {
        let googleToken = req.body.googleToken

        let ticket = new Promise(function (resolve, reject) {
                client.verifyIdToken({
                    idToken: googleToken,
                    audience: GOOGLE_CLIENT_ID
                }, function (err, data) {
                    if (!err) {
                        let payload = data.getPayload()
                        let userid = payload['sub']
                        resolve(userid)
                    } else {
                        reject(err)
                    }
                })
            })
            .then(userid => {
                axios({
                        method: 'GET',
                        url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
                    })
                    .then(result => {
                        req.body.name = result.data.name
                        req.body.email = result.data.email
                        next()
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: `access denied`
                        })
                    })
            })
    }
}