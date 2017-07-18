//загрузка нового изображения

const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    let mime = file.mimetype;
    let extention = mime.slice(mime.indexOf("/")+1);
    (extention=="svg+xml")?extention="svg":(extention=="x-icon")?extention="ico":extention;
    cb(null, `${Date.now()}.${extention}`);
  }
})

module.exports = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  dest: 'public/images/',
  fileFilter: function (req, file, cb) {
    let mime = file.mimetype;
    if (mime.indexOf('image') == -1) {
      cb(null, false);
    }else{
      cb(null, true);
    }
  }
}).single('image');
