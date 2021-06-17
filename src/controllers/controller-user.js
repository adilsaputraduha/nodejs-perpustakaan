const config = require('../configs/database');

let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    list(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM table_user;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('user', {
                        url: URL,
                        // userName: req.session.username,
                        userId: req.session.id_user,
                        user: results,
                    });
                }
            );
            connection.release();
        });
    },
    delete(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `DELETE FROM table_user
                WHERE id_user = ?`,
                [req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/user');
                }
            );
            connection.release();
        });
    },
};
