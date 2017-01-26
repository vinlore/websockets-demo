var Email = (sql) => {
    return {
        create: (email, callback) => {
            sql.getConnection((err, connection) => {
                connection.query('INSERT INTO emails SET ?', email, (err) => {
                    connection.release();
                    if (err) {
                        throw err;
                        callback(false);
                    } else {
                        callback(true);
                    }
                });
            });
        },
        index: (id, callback) => {
            sql.getConnection((err, connection) => {
                connection.query('SELECT * FROM emails WHERE user_to_id = ?', id, (err, emails) => {
                    connection.release();
                    if (err) {
                        callback(false);
                    } else {
                        callback(emails);
                    }
                });
            });
        }
    }
};

module.exports = Email;