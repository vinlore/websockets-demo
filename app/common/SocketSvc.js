var app = angular.module('Socket.svc', []);

app.factory('Socket', function($http, $auth) {

    var socket = io.connect('http://localhost:8000');
    socket.on('connect', () => {
        socket.emit('authenticate', { token: $auth.getToken() });
        socket.on('authenticated', () => {

        })

    });

    return socket;

});