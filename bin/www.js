var http = require('http');
var app = require('../app');
var io = require('../server/sockets/sockets');

app.set('port', 8000);

var server = http.createServer(app);
server.listen(8000);
io(server);