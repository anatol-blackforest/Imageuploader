//password handler

const crypto = require('crypto');

module.exports = function (password) {
    return crypto.createHmac('sha1', 'abc').update(password).digest('hex'); 
};
