const express = require('express')
const app = express()
const Mongoose = require('mongoose')
const db = Mongoose.connection
const UserController = require('./controllers/UserController')
const cors = require('cors')
const port = process.env.PORT || 3000
require('dotenv').config
Mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser:true})
db.once('open', function(){
    console.log('Connect to mongoose')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.listen(port, function(){
    console.log(`Hello express from port : ${port}`)
})
app.get('/',UserController.all)
const UserRoutes = require('./routes/users')
app.use('/users', UserRoutes)

