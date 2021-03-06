//вывод коллекции изображений
const path = require('path');
const fs = require('fs');

let {admin, title, descr} = require('./messages');

module.exports = function (isAdmin, res, hint){
    fs.readdir(path.join('public', 'images'), (err, items) => {
        if(err) return console.error(err);
        if(isAdmin){
            //с админскими правами
            res.render(
                'index', 
                { 
                title: title[0],
                descr: descr[0],
                hint,
                imagename: items.reverse(),
                admin
                }
            );
        }else{
            //без админских прав
            res.render(
                'auth', 
                { 
                title: title[1],
                descr: descr[1],
                hint,
                imagename: items.reverse()
                }
            );
        }
    });
}
