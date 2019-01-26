var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var indexRouter = require('./api/index');
var logger = require('morgan');
var app = express();
var tasks = require('./api/tasks');
var transport = require('./api/transport');
var deals = require('./api/deals');
var users = require('./api/users');


app.locals.videodata = require('./videodata.json');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// api routes
app.use('/api', tasks);
app.use('/api/transport', transport);
// app.use('/api/deals', deals);
app.use('/api/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// body parser MW
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extend: false}));

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
