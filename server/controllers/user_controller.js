const User = require('../models/user')
const Helper = require('../helper/index')
const jwt = require('jsonwebtoken');
const mailer = require('../helper/mailer')
require('dotenv').config()

class UserController {

    static create ( req, res ) {
        console.log(`masuk create user`)
        console.log(req.body)
        let randomPassword = Math.random().toString(36).slice(-8);
        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            password: randomPassword,
            role: req.body.role
        })
        user.save( (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).json( {error : err, message : "Something went wrong, please call developer!"} )
            } if ( data ) {
                console.log(`setelah encrypt`)
                console.log(data)
                let subject = `password poll shopPoint anda`
                let resultText = `password anda adalah ${randomPassword} , silahkan lakukan perubahan untuk keamanan akun anda`
                mailer ( data.email, subject, resultText, (err ) => {
                    if ( err) res.send (err )
                    else res.status(200).json( data )
                })
            }
        })
    }

    static signIn ( req, res ) {
        User.findOne({ email : req.body.email})
            .then( user => {
                if ( user !== null ){
                    let hash = Helper.encryp( req.body.password, user.salt)
                    if ( user.password === hash ){
                        let data = { id : user._id}
                        let myRole = user.role
                        let jToken = jwt.sign( data, process.env.jSecret)
                        res.status(200).json( {jToken, myRole} )
                    } else {
                        console.log(err)
                        res.status(500).json( {error : err, message : "your email address or password is incorrect"} )
                        //res.status(500).json( "your email address or password is incorrect" )    
                    }
                    
                } else {
                    console.log(err)
                    res.status(500).json( {error : err, message : "your email address or password is incorrect"} )
                    //res.status(500).json( "your email address or password is incorrect" )    
                }
            })
            .catch( err => {
                console.log(err)
                res.status(500).json( {error : err, message : "your email address or password is incorrect"} )
                //res.status(500).json( "your email address or password is incorrect" )
            })
    }

    static update ( req, res ) {
        User.updateOne({_id: req.params.id},{
            email: req.body.email,
            name: req.body.name,
            role: req.body.role
        })
            .then( User => {
                console.log( `masuk user`)
                console.log(User)
                res.status(200).json( User )
            })
            .catch( err => {
                console.log( err )
                res.status(500).json( err )
            })
    }

    static delete ( req, res ) {
        console.log(`masuk delete`)
        User.deleteOne({_id: req.params.id})
            .then( result => {
                res.status(200).json( result )
            })
            .catch( err => {
                res.status(500).json( err )
            })
    }

    static gSignIn ( req, res ) {
        const {OAuth2Client} = require('google-auth-library');
        const client = new OAuth2Client(process.env.gSecret);
        client.verifyIdToken({
            idToken: req.headers.gtoken
        },( err, result ) => {
            if ( err ) {
                res.status(500).json( err )
            } else {
                User.findOne({ email : result.payload['email']})
                .then( user => {
                    if ( user !== null ){
                        let data = { id : user._id}
                        let jToken = jwt.sign( data, process.env.jSecret )
                        //gimana kirim jToken sambil redirect
                        //res.status(200).json( {jToken} )
                        if ( user.role === 'admin' ) {
                            res.status(200).json( {jToken} )
                        }
                    } 
                    else {
                        let user = new User ({
                            email: result.payload['email'],
                            password: req.headers.gtoken
                        })
                        user.save( (err, data) => {
                            if (err) {
                                console.log( err )
                                res.status(500).json({ "error found" : err})
                            } if ( data ) {
                                let data = { id : user._id}
                                let jToken = jwt.sign( data, process.env.jSecret)
                                res.status(200).json( {jToken} )
                            }
                        })
                    }
                })
                .catch( err => {
                    console.log(err)
                    res.status(500).json( {"Upps something wrong.." : err} )
                })
            }
        });
    }

    static findAll ( req, res ) {
        console.log(`masuk readall`)
        User.find()
        .then( users => {
            let usersArr = []
            for ( let i = 0; i < users.length; i++ ) {
                let obj = {
                    id : users[i]._id,
                    email : users[i].email,
                    name : users[i].name,
                    role : users[i].role
                }
                usersArr.push( obj )
            }
            res.status(200).json( {usersArr} )
        })
        .catch( err => {
            console.log(err)
            res.status(500).json( {error : err, message : err.message} )
        })
    }

    static admin ( req, res ) {
        User.find()
        .then( users => {
            res.status(200).json( {users} )
        })
        .catch( err => {
            console.log(err)
            res.status(500).json( {"Upps something wrong.." : err} )
        })
    }

    static findOne ( req, res ) {
        console.log(`masuk findOne`)
        console.log(req.params.id)
        User.findById(req.params.id)
        .then( user => {
            let obj = {
                id : user._id,
                email : user.email,
                name : user.name,
                role : user.role
            }
            res.status(200).json( {obj} )
        })
        .catch( err => {
            console.log(err)
            res.status(500).json( {"Upps something wrong.." : err} )
        })
    }

}

module.exports = UserController