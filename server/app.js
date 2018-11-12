require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/', router)




app.listen(3000, () => {
    console.log('express started on port 3000')
    mongoose.connect('mongodb://localhost/ecommerce', {useNewUrlParser: true})
        .then(() => {
            console.log('mongodb started')
        })
        .catch(err => {
            console.log(err)
        })
})