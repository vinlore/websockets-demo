var io = require('socket.io');
var iojwt = require('socketio-jwt');
var User = require('../controllers').User;
var Email = require('../controllers').Email;
var _ = require('underscore');

var iosocket = (server) => {
    io = io.listen(server);

    io.sockets
        .on('connection', iojwt.authorize({
            secret: '=4^zw9rx1xi6@5sn87im04o%(tkzos2#zb)$88p1%q#4#qf!#r',
            timeout: 30000
        }))
        .on('authenticated', (socket) => {
            console.log('user connected');

            socket.on('load emails', () => {
                console.log('loading emails');
                Email.index(socket.decoded_token.user[0].id, (emails) => {
                    if (emails) {
                        console.log('emails loaded. sending to client');
                        socket.emit('emails loaded', emails);
                    } else {
                        socket.emit('error', 'Emails couldn\'t be loaded.');
                    }
                });
            });

            socket.on('send email', (email) => {
                console.log('received email');
                _(email).extend({
                    user_from_id: socket.decoded_token.user[0].id,
                    user_from: socket.decoded_token.user[0].username,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    read: 0
                });
                User.getId(email.user_to, (res) => {
                    if (res) {
                        _(email).extend({ user_to_id: res });
                        Email.create(email, (res) => {
                            if (res) {
                                Email.index(socket.decoded_token.id, (emails) => {
                                    if (emails) {
                                        socket.emit('new email', emails);
                                    } else {
                                        socket.emit('error');
                                    }
                                });                            
                            } else {
                                socket.emit('error');
                            }
                        });
                    } else {
                        socket.emit('error');
                    }
                });
            });
        });
};

module.exports = iosocket;