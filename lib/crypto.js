//password handler

const crypto = require('crypto');

module.exports = function (password) {
    let hash = crypto.createHmac('sha1', 'abc').update(password).digest('hex'); 
    return hash;
};