const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('cookie-session')
const twig = require('twig');
const util = require('util');
const multer = require('multer');
const fs = require('fs');

const uploader = require('./lib/uploader');
const render = require('./lib/render');
const remover = require('./lib/remover');

const app = express();

let messages = ["Very big image! (must be less than 2 mb)", "Please upload image only!", "Пожалуйста, введите верные логин и пароль", "Хуй хакерам, а не помидоры!"],
    //имя и пароль админа (вне базы для этой версии)
    admin = {username:"admin", password:"123"},
    title = ["Image uploader", "Авторизация"],
    descr = ["* images only (2MB max)","Введите логин и пароль"],
    hint;

//шаблонизатор
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({keys: ['montesuma']}));

//авторизация
app.post("/login/", function (req, res, next) {
	if(req.body.username == admin.username && req.body.password == admin.password){
        req.session.admin = true;
        res.redirect("/");
    }else{
        hint = messages[2];
        render(req, res, title, descr, hint);
    }
});

app.route("/")
    //вывод изображений
    .get((req, res) => {
        hint = false;
        render(req, res, title, descr, hint);
    })
    //валидация, загрузка и вывод обновленной коллекции
    .post((req, res, next) => {
        if(req.session.admin){
            uploader(req, res, function (err) {
                if (err){
                    hint = messages[0];
                    render(req, res, title, descr, hint);
                } else {
                    if (req.file && req.file.mimetype && req.file.mimetype.indexOf('image') !== -1){
                        hint = false;
                        render(req, res, title, descr, hint);
                    } else {
                        hint =  messages[1];
                        render(req, res, title, descr, hint);
                    }
                }
            });
        }else{
            hint = messages[3];
            render(req, res, title, descr, hint);
        }
    });

//удаление изображения
app.delete("/delete/:id", (req, res) => {
    if(req.session.admin){
        remover(req, res, () => {
            hint = false;
            render(req, res, title, descr, hint);
        });
    }else{
        hint = messages[3];
        render(req, res, title, descr, hint);
    }
})    

// ловим 404 ошибку
app.use((req, res) => {
  res.status(404).render("404.twig");
}); 

module.exports = app;
