const path = require('path')


function checkFleType(file, cb) {
    console.log(file)
    //allowed types
    const fileTypes = /jpeg|jpg|png/
    //check type
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    //check MIME
    const mimeType = fileTypes.test(file.mimetype)

    if(mimeType && extName){
        return cb(null, true)
    } else {
        cb('Error: Images only')
    }
}

module.exports = checkFleType