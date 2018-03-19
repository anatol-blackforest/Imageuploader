const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const twig = require('twig');
const util = require('util');
const multer = require('multer');
const fs = require('fs');

const uploader = require('./lib/uploader');
const render = require('./lib/render');
const remover = require('./lib/remover');
const crypto = require('./lib/crypto');
const msgs = require('./lib/messages');

const app = express();

let {messages, admin} = msgs,
    isAdmin;

//шаблонизатор
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({keys: ['montesuma']}));

//проверяем админский хэш в сессии
app.use((req, res, next) => {
    isAdmin = (req.session.passHash == admin.passHash);
    next();
});

//авторизация
app.post("/login/", (req, res) => {
	if(req.body.username == admin.username && crypto(req.body.password) == admin.passHash){
        req.session.passHash = admin.passHash;
        res.redirect("/");
    }else{
        render(isAdmin, res, messages[2]);
    }
});

//выход
app.post("/logout/", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.route("/")
    //вывод изображений
    .get((req, res) => render(isAdmin, res))
    //валидация, загрузка и вывод обновленной коллекции
    .post((req, res) => {
        if(!isAdmin) return render(isAdmin, res, messages[3]);
        uploader(req, res, err => {
            if (err) return render(isAdmin, res, messages[0]);
            if (req.file && req.file.mimetype && req.file.mimetype.indexOf('image') !== -1) return render(isAdmin, res);
            render(isAdmin, res, messages[1]);
        });
    });

//удаление изображения
app.delete("/delete/:id", (req, res) => {
    if(isAdmin) return remover(req, res, () => render(isAdmin, res));
    render(isAdmin, res, messages[3]);
})    

// ловим 404 ошибку
app.use((req, res) => res.status(404).render("404.twig")); 

module.exports = app;
