require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const indexRouter = require('./routes/indexRouter.js');
const userRouter = require('./routes/userRouter.js');
const itemRouter = require('./routes/itemRouter.js');
const cartRouter = require('./routes/cartRouter.js');
const transactionRouter = require('./routes/transactionRouter.js');

mongoose.connect('mongodb://localhost/new-commerce', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/items', itemRouter);
app.use('/carts', cartRouter);
app.use('/transactions', transactionRouter);

app.listen(port, function() {
    console.log('Listening on port', port);
});