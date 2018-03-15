//удаление картинки по клику
const path = require('path');
const fs = require('fs');

module.exports = function (req, res, callback){
    let removed = req.params.id;
    fs.stat(path.join('public', 'images', removed), (err, exists) => {
        if(err) console.error(err);
        if(exists){
            fs.unlink(path.join('public', 'images', removed), callback);
        }
    });
}
