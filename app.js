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

const app = express();

let error = false;

//вывод коллекции изображений
let renderImg = function(res){
    fs.readdir("./public/images/", function(err, items) {
        res.render(
            'index', 
            { 
              title: 'Image uploader', 
              imagename: items.reverse(),
              error
            }
        );
    });
} 

//вывод изображений по заходу или перегрузке страницы
app.get('/', (req, res) => {
    error = false;
    let arg = req.url;
    let removed = arg.slice(arg.indexOf('=')+1);
    console.log(removed);
    if((arg.indexOf("remove") !== -1)){
        fs.exists(`public/images/${removed}`,function(exists){
          if(exists){
            fs.unlink(`public/images/${removed}`);
          }
        });
    }else{
      renderImg(res);
    }
});

//загрузка нового изображения
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    let mime = file.mimetype;
    let extention = mime.slice(mime.indexOf("/")+1);
    (extention=="svg+xml")?extention="svg":(extention=="x-icon")?extention="ico":extention;
    cb(null, `${Date.now()}.${extention}`);
  }
})

let upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  dest: 'public/images/',
  fileFilter: function (req, file, cb) {
    console.log('Upload started');
    let mime = file.mimetype;
    if (mime.indexOf('image') == -1) {
      cb(null, false);
      error = "Please upload image only!"
    }else{
      cb(null, true);
      error = false
    }
  }
}).single('image');

//вывод обновленной коллекции после загрузки нового изображения
app.post('/', (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        // console.log(err);
        error = "Very big image! (must be less than 2 mb)";
        renderImg(res)
      } else{
        renderImg(res);
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
