//удаление картинки по клику
const path = require('path');
const fs = require('fs');

module.exports = function (req, res, callback){
    let removed = req.params.id;
    fs.stat(path.join('public', 'images', removed), err => {
        if (err) return console.error(err);
        fs.unlink(path.join('public', 'images', removed), callback);
    });
}
