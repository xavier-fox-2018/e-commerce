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




app.listen(80, () => {
    console.log('express started on port 3000')
    // mongoose.connect('mongodb://localhost/ecommerce', {useNewUrlParser: true})
    //     .then(() => {
    //         console.log('mongodb started')
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })


    const mongodUri = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds239682.mlab.com:39682/ecommerce`
    mongoose.connect(mongodUri, {
        useNewUrlParser: true
    })
})