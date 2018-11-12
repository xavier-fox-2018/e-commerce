require('dotenv').config()
const express = require('express'),
      mongoose = require('mongoose'),
      cors = require('cors'),
      db = mongoose.connection,
      dbURI = `mongodb://<dbuser>:<dbpassword>@ds151463.mlab.com:51463/e-commerce`

      app = express(),
      port = process.env.PORT || 3000

mongoose
    .connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser:true})
db
    .on('error', console.error.bind(console, 'database connection error:'))
    .once('open', function() {
        console.log('database connected')
    });

const loginRouter = require('./routes/login'),
      userRouter = require('./routes/user'),
      shopRouter = require('./routes/shop'),
      categoryRouter = require('./routes/category'),
      cartRouter = require('./routes/cart')

app
    .use(express.urlencoded({extended: false}))
    .use(express.json())
    .use(cors())

    .use('/', loginRouter)
    .use('/users', userRouter)
    .use('/shops', shopRouter)
    .use('/category', categoryRouter)
    .use('/cart', cartRouter)

    .listen(port, () => {
        console.log(`Listening on port ${port}`);   
    })