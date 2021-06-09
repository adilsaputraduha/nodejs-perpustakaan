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
                SELECT * FROM table_book JOIN table_category ON kategori=id_kategori;
                SELECT * FROM table_category;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('book', {
                        url: URL,
                        // userName: req.session.username,
                        userId: req.session.id_user,
                        book: results[0],
                        category: results[1],
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
                `INSERT INTO table_book SET ? `,
                {
                    kode_buku: req.body.code,
                    judul: req.body.title,
                    pengarang: req.body.author,
                    penerbit: req.body.publisher,
                    kategori: req.body.category,
                },
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/book');
                }
            );
            connection.release();
        });
    },
    update(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `UPDATE table_book SET
                kode_buku = ?,
                judul = ?,
                pengarang = ?,
                penerbit = ?,
                kategori = ?
            WHERE id_buku = ?`,
                [req.body.code, req.body.title, req.body.author, req.body.publisher, req.body.category, req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/book');
                }
            );
            connection.release();
        });
    },
    delete(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `DELETE FROM table_book
                WHERE id_buku = ?`,
                [req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/book');
                }
            );
            connection.release();
        });
    },
};
