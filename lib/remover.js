//удаление картинки по клику

const fs = require('fs');

module.exports = function (req, res, title, descr, hint, render){
    let removed = req.query.remove;
    if(removed){
        fs.exists(`public/images/${removed}`,function(exists){
            if(exists){
                fs.unlink(`public/images/${removed}`);
            }
        });
    }else{
        render(res, title, descr, hint);
    }
}