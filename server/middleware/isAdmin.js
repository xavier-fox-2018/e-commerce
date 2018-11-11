function isAdmin (req, res, next) {
    if(req.decoded.role === 'Admin') {
        next()
    } else {
        console.log('From Admin')
        res.status(401).json({message:'Please login as Admin'})
    }
}

module.exports = isAdmin