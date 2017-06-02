//удаление картинки по клику

const fs = require('fs');

module.exports = function (req, res){
    let removed = req.query.remove;
    fs.exists(`public/images/${removed}`, function(exists){
        if(exists){
            fs.unlink(`public/images/${removed}`);
        }
    });
}