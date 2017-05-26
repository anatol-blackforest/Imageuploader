//вывод коллекции изображений

const fs = require('fs');

module.exports = function (res, title, descr, hint){
    fs.readdir("./public/images/", function(err, items) {
        res.render(
            'index', 
            { 
              title,
              descr,
              hint,
              imagename: items.reverse()
            }
        );
    });
}