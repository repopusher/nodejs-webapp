var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const session = require('express-session');   //Using express-session to handle sessions and cookies.

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var newUserRouter = require('./routes/newUser');
var helpRouter = require('./routes/help');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var contactRouter = require('./routes/contact');
const {SESSION_NAME, SECRET} = require("./routes/roles");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static("public/stylesheets"));  //Making style.css public with static middleware

app.use(session({     //Setting up generic session
  name: SESSION_NAME,
  secret: SECRET,
  cookie: {
    httpOnly: true,
    maxAge: 60000000000
  },
  saveUninitialized: false,
}));

app.use(logger('dev'));           //Middleware used by application
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/newUser', newUserRouter);
app.use('/help', helpRouter);
app.use('/contact', contactRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
