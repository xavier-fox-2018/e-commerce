const jwt = require('jsonwebtoken')

function isAdmin(req, res, next) {
    if (req.headers.hasOwnProperty('accesstoken')) {
        let accesstoken = req.headers.accesstoken
        let user = jwt.verify(accesstoken, process.env.JWT_SECRET) 
        console.log(user, 'dari isAdmin');
        if (user.role == 'admin') {
            req.userID = user.id
            next()
        }
        else {
            res.status(400).json({message: `You are not admin`})
        }
    }
    else {
        res.status(400).json({message: 'user is not logged in'})
    }
}




module.exports = isAdmin