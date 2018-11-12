const mongoose = require('mongoose')

//google 
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

//json web token
const { encoded, decoded } = require('../helpers/jasonWebToken')

//bcrypt
const { comparePassword, hashingPassword,genSalt } = require('../helpers/brcyrpt')

//model
const User = require('../models/user')




module.exports = {
    gSignIn : (req, res) => {
        let gtoken = req.body.gtoken
       
        client.verifyIdToken({
            idToken : gtoken,
            audience : process.env.CLIENT_ID
        }, (error, data) => {
            if (error) {
                res.status(500).json({message : 'Error while auntentice google sign in', error: error.message})
            }else {
                let email = data.payload.email
                let name = data.payload.given_name
                let password= data.payload.given_name

                User
                    .findOne( { email })
                    .then( user => {
                        if ( user ) {
                            let _id = user._id
                            let jtoken = encoded({ email : user.email,id :user._id, role : user.role})  
                            res.status(200).json( jtoken )
                        }else {
                            let user = new User({ name, email, password })
                            user
                                .save()
                                .then( user => {
                                    let _id = user._id
                                    let jtoken = encoded({ email : user.email,id :user._id, role : user.role})  
                                    res.staAdmintus(200).json( jtoken )
                                })
                                .catch( error => {
                                    res.status(500).json({ message : 'Error create user in database', error: error.message})   
                                })
                        }
                    })
                    .catch( error => {
                        res.status(500).json({ message : 'Error check user in database', error: error.message})   
                    })
            }
        })

    },
    createAdmin: (req, res) => {
       
        let name = req.body.name
        let email = req.body.email
        let password = hashingPassword(req.body.password, genSalt())
        let role = 'admin'
        
        let admin = new User({ name, email, password, role})
        admin
            .save()
            .then( newadmin => {
                res.status(200).json({ newadmin})
            })
            .catch( error => {
                res.status(500).json({ message : error.message})
            })
    },
    signin : (req, res) => {
        console.log('masuk sign in')

        let email = req.body.email
        let password = req.body.password

       
        User
            .findOne( { email })
            .populate('carts._id')
            .then( user => {
               
                if( user ){
                    let checkedPassword = comparePassword(password, user.password)
                    
                    if( checkedPassword ) {
                       
                        let jtoken = encoded({ email : user.email, password : user.password, id : user._id })
                        if( user.role === 'member'){
                            res.status(200).json( { jtoken, view : user.role, cart : user.carts } )
                        }else {
                            res.status(200).json( { jtoken, view : user.role } )
                        }

                    }else {
                        res.status(401).json({ message : 'Sorry, password incorrect!'})
                    }
                }else {
                    res.status(401).json({ message : 'Sorry, email is not registered!'})
                }
            })
            .catch( error => {
              
                res.status(500).json({ message : 'Error sign user ', error: error.message})   
            })
        

        
        
    },
    signup: (req, res) => {
        let name = req.body.name
        let email = req.body.email
        let password = req.body.password
        password = hashingPassword(password, genSalt()) 

        let user = new User({ name,  email, password })
        
        user
            .save()
            .then( newuser => {
                res.status(200).json( newuser )
            })
            .catch( error => {
                res.status(500).json(error )
            })
    },
    findUser : (req, res) => {
        let user_id = req._id
        User
            .findById( user_id)
            .populate('carts._id')
            .then( user => {
                res.status(200).json( user )
            })
            .catch( error => {
                res.status(500).json( error )
            })
    },
    readAdmin : (req, res) => {
        User
            .find({ role : 'admin'})
            .then( users => {
                res.status(200).json( users )
            })
            .catch(error => {
                res.status(500).json({ message : error.message})
            })
    },
    deleteAdmin : (req, res) => {
        let id = req.params.id
        User
            .findByIdAndDelete(id)
            .then( response =>{
                res.status(200).json( response )
            })
            .catch( error => {
                res.status(500).json( { message : error.message })
            })
    },
    updateAdmin : (req, res) => {
        let id = req.params.id
       
        
        if( req.body.password ) {
            req.body.password = hashingPassword(req.body.password, genSalt())
            console.log(req.body)
        }

        User
            .findById( id )
            .then ( user => {
                user.set(req.body)
                return user.save()
            })
            .then( response => {
                res.status(200).json( response )
            })
            .catch( error =>{
                res.status(500).json({ error : error.message})
            })
    }
}   