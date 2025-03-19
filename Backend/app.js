var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
const connectToDb = require('./db/db');
connectToDb();

const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes")

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to log request data
app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`);
  console.log("Request Body:", req.body);
  console.log("Query Params:", req.query);
  console.log("Headers:", req.headers);
  next();
});

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/users', userRoutes)
app.use('/captain', captainRoutes)

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
