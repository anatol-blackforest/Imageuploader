//удаление картинки по клику

const fs = require('fs');

module.exports = function (req, res, callback){
    let removed = req.params.id;
    fs.exists(`public/images/${removed}`, function(exists){
        if(exists){
            fs.unlink(`public/images/${removed}`, callback);
        }
    });
}