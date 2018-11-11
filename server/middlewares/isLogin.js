const hash = require('../helpers/hash')
const User = require('../models/user')

module.exports = {
    isLogin: (req, res, next) =>{
        let token = req.headers.token
        console.log(`ini tokeennnn`,req.headers);
        
        if(token){
            let verify = hash.jwtDecode(token)
            console.log(verify);
            
            User.findOne({_id: verify.id})
            .then(result =>{
                if(result){
                    req.decoded = verify
                    next()
                } else {
                    res.status(401).json({
                        message: `Your No Access`
                    })
                }
            })
            .catch( ()=>{
                res.status(500).json({
                    message: `Server Error`
                })
            })
        } else {
            res.status(401).json({
                message: `No Authenticate`
            })
        }
    },

    isAdmin : (req, res, next)=>{
        if(req.decoded.role === 'admin'){
            next()
        }else{
            res.status(403).json(`forbidden boy`)
        }
    }
}