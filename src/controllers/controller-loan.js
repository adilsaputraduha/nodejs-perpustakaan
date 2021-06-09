const config = require('../configs/database');
const moment = require('moment');

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
                SELECT * FROM table_peminjaman JOIN table_book ON buku_id=id_buku
                JOIN table_anggota ON kode_anggota=anggota_kode JOIN table_user ON 
                id_user=user_id;
                SELECT * FROM table_anggota;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('loan', {
                        url: URL,
                        moment: moment,
                        // userName: req.session.username,
                        userId: req.session.id_user,
                        loan: results[0],
                        member: results[1],
                    });
                }
            );
            connection.release();
        });
    },
    new(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT buku, kode_buku, judul, jumlah FROM table_temporary
                JOIN table_book ON buku=id_buku;
                SELECT * FROM table_anggota;
                SELECT * FROM table_book;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('loan-new', {
                        url: URL,
                        moment: moment,
                        // userName: req.session.username,
                        userId: req.session.id_user,
                        temp: results[0],
                        member: results[1],
                        book: results[2],
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
    temp(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `INSERT INTO table_temporary SET ? `,
                {
                    kd_anggota: req.body.memberCode,
                    buku: req.body.bookId,
                    jumlah: req.body.qty,
                },
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/loan/new');
                }
            );
            connection.release();
        });
    },
    // update(req, res) {
    //     pool.getConnection(function (err, connection) {
    //         if (err) throw err;
    //         connection.query(
    //             `UPDATE table_book SET
    //             kode_buku = ?,
    //             judul = ?,
    //             pengarang = ?,
    //             penerbit = ?,
    //             kategori = ?
    //         WHERE id_buku = ?`,
    //             [req.body.code, req.body.title, req.body.author, req.body.publisher, req.body.category, req.body.id],
    //             function (error, results) {
    //                 if (error) throw error;
    //                 res.redirect('/book');
    //             }
    //         );
    //         connection.release();
    //     });
    // },
    delete(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `DELETE FROM table_peminjaman
                WHERE id_peminjaman = ?`,
                [req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/loan');
                }
            );
            connection.release();
        });
    },
};
