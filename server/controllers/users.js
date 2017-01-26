var jwt = require('jsonwebtoken');

var User = (sql) => {
    return {
        auth: (req, res) => {
            sql.getConnection((err, connection) => {
                connection.query('SELECT * FROM users WHERE username = ?', req.body.username, (err, user) => {
                    connection.release();
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        if (user[0].password != req.body.password) {
                            res.status(401).send('incorrect password');
                        } else {
                            var token = jwt.sign({user}, '=4^zw9rx1xi6@5sn87im04o%(tkzos2#zb)$88p1%q#4#qf!#r', { expiresIn: '24h' });
                            res.status(201).send({ token: token });
                        }
                    }
                });
            });
        },
        getId: (username, callback) => {
            sql.getConnection((err, connection) => {
                connection.query('SELECT * FROM users WHERE username = ?', username, (err, user) => {
                    connection.release();
                    if (err) {
                        callback(false);
                        throw err;
                    } else {
                        callback(user[0].id);
                    }
                });
            });
        }
    }
}

module.exports = User;