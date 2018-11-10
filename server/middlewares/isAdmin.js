const User = require('../models/userModel.js');

function isAdmin(req, res, next) {
    if (req.user) {
        try {
            User.findById(req.user._id)
                .then(function(user) {
                    if (user.role === 'admin') {
                        next();
                    } else {
                        res.status(401).json({
                            message: "Sorry, this is admin's exclusive feature"
                        });
                    }
                })
                .catch(function(err) {
                    console.log('Find User in isAdmin Error: ', err);
                    res.status(500).json(err);
                });
        } catch (err) {
            res.status(500).json({
                error: err
            });
        }
    } else {
        res.status(400).json({
            message: 'Token not found'
        });
    }
}

module.exports = isAdmin;