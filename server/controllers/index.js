var mysql = require('mysql');

var sql = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'emailer'
});

var User = require('./users.js')(sql);
var Email = require('./emails.js')(sql);

module.exports = {
    User,
    Email
};