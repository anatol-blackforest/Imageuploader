//удаление картинки по клику

const fs = require('fs');

module.exports = function (req, res, callback){
    let removed = req.params.id;
    fs.stat(`public/images/${removed}`, (err, exists) => {
        if(err) throw err;
        if(exists){
            fs.unlink(`public/images/${removed}`, callback);
        }
    });
}