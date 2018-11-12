require("dotenv").config();
const express = require ('express');
const app = express();
const cors = require('cors');
const bodyParser = require ('body-parser');
const router = require ('./routes');
const itemRouter = require ('./routes/item.js');
const port = 3000 || process.env.PORT;

// DB CONNECT 
const mongoose = require ('mongoose');
mongodb://<dbuser>:<dbpassword>@ds255403.mlab.com:55403/kingcruises
mongoose.connect('mongodb://user1:a12345@ds255403.mlab.com:55403/kingcruises', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () =>console.log('connection error'));
db.once('open', function () {console.log('connection')});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());

app.use('/', router);
app.use('/items', itemRouter);

app.listen(port, ()=> console.log('cors-enabled router is listening'))