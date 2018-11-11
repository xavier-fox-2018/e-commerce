const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    encode: (password) =>{
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        return hash
    },

    decode: (inputPassword, hash) =>{
        return bcrypt.compareSync(inputPassword, hash)
    },

    jwtEncode: (data) =>{
        return jwt.sign(data, process.env.JWTSECRET)
    },
    jwtDecode: (token) => {
        let decode = jwt.verify(token, process.env.JWTSECRET)
        return decode
    }  
}
