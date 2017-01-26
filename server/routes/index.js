var User = require('../controllers').User;
var express = require('express');
var jwt = require('jsonwebtoken');
var auth = express.Router();
var api = express.Router();

auth.post('/login', User.auth);

api.use((req, res, next) => {
    var token = req.headers['authorization'];

    if (token) {
        jwt.verify(token, '=4^zw9rx1xi6@5sn87im04o%(tkzos2#zb)$88p1%q#4#qf!#r', (err, decoded) => {
            if (err) {
                return res.status(401).send('authentication failed');
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send('no token provided');
    }
});

module.exports = {
    auth,
    api
};