//вывод коллекции изображений

const fs = require('fs');

module.exports = function (isAdmin, res, title, descr, hint){
    fs.readdir("./public/images/", function(err, items) {
        if(isAdmin){
            //с админскими правами
            res.render(
                'index', 
                { 
                title: title[0],
                descr: descr[0],
                hint,
                imagename: items.reverse(),
                admin: true
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