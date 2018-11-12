const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/shopping-cart', { useNewUrlParser: true })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error :'))
db.once('open', function(){
    console.log('database connected!')
})



const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
    .use(express.urlencoded({ extended : false}))
    .use(express.json())


const RouteItem = require('./routes/route-item')
const UserRoute = require('./routes/route-user')
const CategoryRoute = require('./routes/route-category')
const TransactionRoute = require('./routes/route-transaction')

app
    .use('/users', UserRoute)
    .use('/categories', CategoryRoute)
    .use('/transactions', TransactionRoute )
    .use('/items', RouteItem)


app.listen(PORT, function(){
    console.log('Listening to port : ', PORT)
})