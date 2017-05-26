const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const twig = require('twig');
const util = require('util');
const multer = require('multer');
const fs = require('fs');

const index = require('./routes/index');
const upload = require('./lib/uploader');
const render = require('./lib/render');

const app = express();

let messages = ["Very big image! (must be less than 2 mb)", "Please upload image only!"],
    title = "Image uploader",
    descr = "* images only (2MB max)",
    error = false;

//вывод изображений по заходу или перегрузке страницы
app.get('/', (req, res) => {
    error = false;
    let removed = req.query.remove;
    //удаление картинки по клику
    if(removed){
        fs.exists(`public/images/${removed}`,function(exists){
          if(exists){
            fs.unlink(`public/images/${removed}`);
          }
        });
    }else{
      render(res, title, descr, error);
    }
});

//вывод обновленной коллекции после загрузки нового изображения
app.post('/', (req, res, next) => {
    upload(req, res, function (err) {
        if (err){
            error = messages[0];
            render(res, title, descr, error);
        } else {
            if (req.file && req.file.mimetype && req.file.mimetype.indexOf('image') !== -1){
                error = false;
                render(res, title, descr, error);
            } else {
                error =  messages[1];
                render(res, title, descr, error);
            }
        }
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express.bodyParser({ uploadDir: 'photos' });

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
