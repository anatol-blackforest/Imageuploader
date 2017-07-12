//вывод коллекции изображений

const fs = require('fs');

module.exports = function (req, res, title, descr, hint, admin){
    fs.readdir("./public/images/", function(err, items) {
        if(req.session.admin){
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