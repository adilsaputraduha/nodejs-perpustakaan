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
                SELECT * FROM table_category;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('category', {
                        url: URL,
                        // userName: req.session.username,
                        userId: req.session.id_user,
                        category: results,
                    });
                }
            );
            connection.release();
        });
    },
    save(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `INSERT INTO table_category SET ? `,
                {
                    nama_kategori: req.body.name,
                    rak: req.body.shelf,
                },
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/category');
                }
            );
            connection.release();
        });
    },
    update(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `UPDATE table_category SET
                nama_kategori = ?,
                rak = ?
            WHERE id_kategori = ?`,
                [req.body.name, req.body.shelf, req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/category');
                }
            );
            connection.release();
        });
    },
    delete(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `DELETE FROM table_category
                WHERE id_kategori = ?`,
                [req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/category');
                }
            );
            connection.release();
        });
    },
};
