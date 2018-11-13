var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var customersRouter = require('./routes/customers');
var cartsRouter = require('./routes/carts');
var itemsRouter = require('./routes/items');
var categoriesRouter = require('./routes/categories');
var transactionsRouter = require('./routes/transactions.js');
var topupsRouter = require('./routes/topups');
var cors = require('cors')
var app = express();
app.use(cors())
    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/uploads')));

app.use('/', indexRouter);
app.use('/customers', customersRouter);
app.use('/carts', cartsRouter);
app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter);
app.use('/transactions', transactionsRouter);
app.use('/topups', topupsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;