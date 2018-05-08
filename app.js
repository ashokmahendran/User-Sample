const express = require('express');
const Config = require('./config');
const logging = require('./log/logging');
var mangoose  = require('./dbconfig');
var path = require('path');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var jwt = require('jsonwebtoken');
var logger = require('morgan');

const app = express();
// For View Engine Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./routes/routes.js')(app);
/*
app.use(cookieParser());

app.all('*',function(req,res,next){
  console.log('>>>>>', req.url);
  if(!(req.url.endsWith('/login') || req.url ==='/' || req.url.endsWith('/logout'))){
     var token = req.cookies.jwtToken;
     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
     console.log(token);
     if(token){
      // verify a token symmetric
        jwt.verify(token, 'secret', function(err, decoded) {
        console.log(decoded.userid) // bar
        next();
      });
     }else{
        next(createError(401));
     }
  }else{
    next();
  }
});

require('./routes/routes.js')(app);
// listen for requests Router Configuration

// Application Starting 

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log('AA>>>>>AA'+err.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
app.listen(Config.PORT, () => {
    logging.info('Example app listening on port ' + Config.PORT);
}).on('error',(err)=>{
    logging.error("Error at starting"+err.message);
});

