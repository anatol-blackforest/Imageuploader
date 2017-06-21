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
const uploader = require('./lib/uploader');
const render = require('./lib/render');
const remover = require('./lib/remover');

const app = express();

let messages = ["Very big image! (must be less than 2 mb)", "Please upload image only!"],
    title = "Image uploader",
    descr = "* images only (2MB max)",
    hint;

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

app.route("/")
    //вывод изображений
    .get((req, res) => {
        hint = false;
        render(res, title, descr, hint);
    })
    //удаление изображения
    .delete((req, res) => {
        remover(req, res);
    })
    //валидация, загрузка и вывод обновленной коллекции
    .post((req, res, next) => {
        uploader(req, res, function (err) {
            if (err){
                hint = messages[0];
                render(res, title, descr, hint);
            } else {
                if (req.file && req.file.mimetype && req.file.mimetype.indexOf('image') !== -1){
                    hint = false;
                    render(res, title, descr, hint);
                } else {
                    hint =  messages[1];
                    render(res, title, descr, hint);
                }
            }
        });
    });

// ловим 404 ошибку
app.use((req, res) => {
  res.status(404).render("404.twig");
}); 

module.exports = app;
