const router = require('express').Router()

router.get('/',(req,res)=>{
    res.status(200).json({
        message : ' Deal Daddy Server API'
    })
})

module.exports = router;