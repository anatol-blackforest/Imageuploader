//вывод коллекции изображений

const fs = require('fs');

module.exports = function (res, title, descr, error){
    fs.readdir("./public/images/", function(err, items) {
        res.render(
            'index', 
            { 
              title,
              descr,
              error,
              imagename: items.reverse()
            }
        );
    });
}