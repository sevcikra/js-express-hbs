var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var hbs = require('hbs');
var crypto = require('crypto');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//hbs
hbs.registerPartials(__dirname + '/views/partials');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set a cookie
app.use(function (req, res, next) {
  const domain = req.hostname;
  if(domain === 'localhost'){
    res.locals.isLocalhost = true;
  }
  console.log(domain);

  // check if client sent cookie
  var cookie = req.cookies.FPID;

  if (cookie === undefined) {
    // no: set a new cookie
    randomNumber=crypto.randomUUID();
    if(domain === 'sevcikdemo.eu'){
      res.cookie('FPID',randomNumber, { domain: '.sevcikdemo.eu', maxAge: 900000, httpOnly: true });
    } else {
      res.cookie('FPID',randomNumber, { maxAge: 900000, httpOnly: true });
    }
    console.log('cookie created successfully');
    cookie = randomNumber;

  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  res.locals.fpid = cookie;
  next(); // <-- important!
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
