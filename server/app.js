require("dotenv").config();
const express = require ('express');
const app = express();
const cors = require('cors');
const bodyParser = require ('body-parser');
const router = require ('./routes');
// const cartRouter = require ('./routes/cart.js');
const itemRouter = require ('./routes/item.js');
const port = 3000 || process.env.PORT;

// DB CONNECT 
const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/cruiseEcomm', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () =>console.log('connection error'));
db.once('open', function () {console.log('connection')});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());

app.use('/', router);
// app.use('/cart', cartRouter);
app.use('/items', itemRouter);

app.listen(port, ()=> console.log('cors-enabled router is listening'))