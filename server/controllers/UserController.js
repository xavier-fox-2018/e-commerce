const UserModel = require('../models/UserModel.js');
const helpers = require('../helpers/helpers.js')
const CartModel = require('../models/CartModel.js');

const UserController = {

    verify(req, res) {
        let token = req.headers.token
        let id =  helpers.decodeToken(token)._id
        req.params.id = id
        UserController.findOneById(req, res)
    },

    findOneById(req, res) {
        var id = req.params.id
        UserModel.findById(id)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({
                        message: 'No such User'
                    });
                }
                return res.json(user);
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            });
    },

    list(req,res) {

        UserModel.find().select('_id name email')
            .then((users) => {
                res.json(users)
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            });

    },

    register(req, res) {
        UserModel.create({
                name: req.body.name,
                email: req.body.email,
                password: helpers.hash(req.body.password),
                role: req.body.role
            })
            .then((result) => {

                CartModel.create({
                    customer : result._id,
                    cartItems : [],
                })
                
                let token = helpers.createToken({
                    _id: result._id.toString(),
                    name : result.name,
                    email : result.email
                })

                res.status(201).json({
                    message: "Register Success",
                    token: token,
                    user : {
                        _id: result._id.toString(),
                        name : result.name,
                        email : result.email
                    }
                })
                
            })
            .then((result) => {
                
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error when registering User.',
                    error: err
                });
            });
    },

    login(req, res) {
        UserModel.findOne({
                email: req.body.email
            })
            .then((user) => {
                
                if (user && helpers.compareSync(req.body.password, user.password)) {
                    let token = helpers.createToken({
                        _id: user._id.toString(),
                        name : user.name,
                        email : user.email
                    })

                    res.status(200).json({
                        token: token,
                        message: "Login Success",
                        user : {
                            _id : user._id,
                            name : user.name,
                            email : user.email,
                        }
                    })
                } else {
                    res.status(400).json({
                        message: "Wrong email & Password"
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            });
    },

    update(req, res) {
        const id = req.params.id;
        UserModel.findOne({
            _id: id
        }, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User',
                    error: err
                });
            }
            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            User.name = req.body.name ? req.body.name : User.name;
            User.email = req.body.email ? req.body.email : User.email;
            User.password = req.body.password ? req.body.password : User.password;

            User.save(function (err, User) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating User.',
                        error: err
                    });
                }
                return res.json(User);
            });
        });
    },

    remove(req, res) {
        var id = req.params.id;
        UserModel.findByIdAndRemove(id, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the User.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    googleSignUp(req, res) {

        UserModel.findOne({
                email: req.body.email
            })
            .then(data => {
                if (!data) {
                    UserModel.create({
                            name: req.body.name,
                            email: req.body.email,
                            password: helpers.hash(req.body.email)
                        })
                        .then((result) => {
                            let token = helpers.createToken({
                                _id: result._id.toString(),
                                name : result.name,
                                email : result.email
                            })
                
                            res.status(201).json({
                                message: "Register Success",
                                token: token
                            })
                        }).catch((err) => {
                            res.status(400).json(err)
                        });
                } else {
                    let token = helpers.createToken({
                        _id: data._id.toString(),
                        name : data.name,
                        email : data.email
                    })
                    res.status(200).json({
                        token: token,
                        message: "Login Success",
                        user : {
                            _id : data._id,
                            name : data.name
                        }
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
};

module.exports = UserController