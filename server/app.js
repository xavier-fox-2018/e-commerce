require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://h8ikestore:h8ikestore@ds255403.mlab.com:55403/h8ikestore',{ useNewUrlParser: true, useCreateIndex: true, })
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error"))
mongoose.connection.once("open", ()=> {console.log("MongoDB Connected!")})

const indexRoutes = require('./routes/index.js')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRoutes);

// app.use((req, res, next)=> {next(new Error("Not Found"))})

module.exports = app;
