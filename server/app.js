var express = require('express');
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.set('useCreateIndex', true)
mongoose.connect(`${process.env.DB}`, { useNewUrlParser: true })

db
  .on('error', console.error.bind(console, 'connection error:'))
  .once('open', function () {
    console.log('> DB Connected')
  })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories')
var itemsRouter = require('./routes/items')
var transactionsRouter = require('./routes/transactions')

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter)
app.use('/items', itemsRouter)
app.use('/transactions', transactionsRouter)

module.exports = app;
