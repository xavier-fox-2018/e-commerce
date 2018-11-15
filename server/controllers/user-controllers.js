const User = require('../models/user')
const hash = require('../helpers/hash')
const sgMail = require('@sendgrid/mail')

module.exports = {
    signup: (req, res) => {
        let name = req.body.name
        let email = req.body.email
        let password = hash.encode(req.body.password)
        console.log(`masuk`);
        
        User.find({email:email})
        .then(user => {
            if(user.length === 0) {
                User.create({name, email, password})
                .then(newUser => {  
                    sgMail.setApiKey(process.env.SENDGRID)
                    const msg = {
                        to: email,
                        from: 'noreply@sukalapar.com',
                        subject: 'Wellcome To SukaLapar',
                        text: 'Thanks for register',
                        html: `<strong><p>Thanks for register, Happy Shooping! </p></strong>`
                    }
                    sgMail.send(msg)
                    res.status(201).json({
                        err: false,
                        message: `Success to add ${newUser.name}`,
                        data: newUser,
                        token: hash.jwtEncode({
                            id: newUser._id,
                            name: newUser.name,
                            email: newUser.email,
                            role: newUser.role
                        })
                    })
                })
                .catch(err => {
                    res.status(500).json(err)
                })
            } else {
                res.status(400).json({message:'Email already registered!'})
                console.log(`mas`);
                
            }
        })
        .catch( err => {
            res.status(500).json(err)
        })
    },

    signin : (req, res) => {
        console.log(`masukk`);
        let email = req.body.email
        let password = req.body.password
        User.findOne({email: email})
        .then( user => {
            if(hash.decode(password, user.password)) { 
                res.status(200).json({
                    err: false,
                    name: user.name,
                    role: user.role,
                    token: hash.jwtEncode({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    })
                })
            } else {
                res.status(400).json({message:"Password is wrong"})
                console.log(`masukk`);
            }
        })
        .catch(err => {
            console.log(`masukk`);
            res.status(500).json({err:true, err})
        })
    },

    findAll: (req, res) =>{
        User.find({})
        .then(result =>{
            res.status(200).json({User: result})
        })
        .catch(err => {
            res.status(500).json({err:true, err})
        })
    },



}