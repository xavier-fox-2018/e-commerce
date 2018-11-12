
const Mongoose = require('mongoose')
Mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser:true})
const cors = require('cors')
require('dotenv').config
const port = 1010 || 3000


const ModelUser = require('../models/user')

let dummyData = new ModelUser({
    name: 'Dany Ismail',
    password : 1,
    email : 'dany_arie@yahoo.com',
    role : 'admin',
    cart : []
})

dummyData.save()
 .then(data=>{
     console.log(data)
 })
 .catch((err)=>{
     console.log(err)
 })

