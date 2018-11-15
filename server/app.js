require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')

mongoose.set('useCreateIndex', true)
mongoose.connect(`${process.env.MONGODB_URL}`, {useNewUrlParser: true});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const groupsRouter = require('./routes/groups')
const reviewRouter = require('./routes/reviews')
const cartRouter = require('./routes/carts')
const transactionRouter = require('./routes/transactions')
const couponRouter = require('./routes/coupons')
const categoryRouter = require('./routes/category')

var app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	next();
});

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/groups', groupsRouter);
app.use('/reviews', reviewRouter)
app.use('/carts', cartRouter)
app.use('/transactions', transactionRouter)
app.use('/coupons', couponRouter)
app.use('/categories', categoryRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(()=>{
  console.log('Listened on port', process.env.PORT)
})

module.exports = app;
