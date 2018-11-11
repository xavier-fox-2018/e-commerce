const jwt = require('jsonwebtoken')

function decode(token) {
    let decoded = jwt.verify(token, process.env.JWT_secret)
    return decoded
}
module.exports = decode