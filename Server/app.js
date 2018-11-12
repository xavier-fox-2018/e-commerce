require('dotenv').config()
const express  = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
// const Twitter = require('twitter-node-client').Twitter
const indexRouter   = require('./routers/index')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const categoryRouter = require('./routers/category')
const cartRouter = require('./routers/cart')

mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongo connected')
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/cart', cartRouter)



const port = process.env.PORT || 3000
app.listen(port, (req,res) => {
    console.log(`Server is running on port: ${port}`)
})