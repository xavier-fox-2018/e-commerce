const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const routes = require('./routes')
const itemRoutes = require('./routes/itemRoute')
const categoryRoutes = require('./routes/categoryRoute')

const mongoose = require('mongoose')
mongoose.connect(process.env.mlab, {useNewUrlParser : true, useFindAndModify:false})
const db = mongoose.connection
db.once('open',function(){
    console.log('mongo connected')
})

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/',routes)
app.use('/items',itemRoutes)
app.use('/categories',categoryRoutes)

app.listen(process.env.port, function(){
    console.log('listening on port',process.env.port)
})
