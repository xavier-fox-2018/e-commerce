const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const mongodbUri = 'mongodb://@ds151463.mlab.com:51463/shopping-cart'
require('dotenv')
const cors = require('cors')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//routes
const user = require('./routes/user.js')
const item = require('./routes/item.js')
const cart = require('./routes/cart.js')
const category = require('./routes/category.js')
const decode = require('./routes/decode.js')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//connect mongoose
mongoose.connect(mongodbUri,
  {
    useNewUrlParser: true,
    auth: {
      user: process.env.mlab_user,
      password: process.env.mlab_password
    }
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(('You are Mongected'));
});

//path
app.use('/nile/user', user)
app.use('/nile/decode', decode)
app.use('/nile/item', item)
app.use('/nile/category', category)
app.use('/nile/cart', cart)

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})