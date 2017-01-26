var express = require('express');
var mysql = require('mysql');
var logger = require('morgan');
var parser = require('body-parser');
/*
var http = require('http');
var io = require('socket.io');
var orm = require('orm');*/
var app = express();
/*var server = http.createServer(app);
app.listen(80);
server.listen(3000);
io = io.listen(server);*/

/*app.use(orm.express('mysql://root@localhost/websockets', {
    define: (db, models, next) => {
        db.load('./models/models', (err) => {
            if (err) {
                throw err;
            } else {
                db.sync();
            }
        });
        next();
    }
}));*/

app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

var routes = require('./server/routes');
app.use('/api', routes.auth);
app.use('/api', routes.api);
app.use(express.static(__dirname + '/app'));

/*io.on('connection', (socket) => {
    socket.broadcast.emit('user connected');

    socket.on('email', (data) => {
        io.sockets.emit('broadcast', data);
    });
});*/

module.exports = app;