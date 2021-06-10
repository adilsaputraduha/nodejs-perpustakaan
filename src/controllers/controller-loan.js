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
                SELECT * FROM table_peminjaman JOIN table_anggota ON kode_anggota=anggota_kode 
                JOIN table_user ON id_user=user_id;
                SELECT * FROM table_anggota;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('loan', {
                        url: URL,
                        moment: moment,
                        username: req.session.username,
                        userid: req.session.userid,
                        loan: results[0],
                        member: results[1],
                    });
                }
            );
            connection.release();
        });
    },
    new(req, res) {
        let id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT buku, kode_buku, judul, jumlah FROM table_temporary
                JOIN table_book ON buku=id_buku WHERE kd_anggota = ${id};
                SELECT * FROM table_book;
                SELECT faktur FROM table_peminjaman ORDER BY faktur DESC LIMIT 1;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('loan-new', {
                        url: URL,
                        moment: moment,
                        username: req.session.username,
                        userid: req.session.userid,
                        temp: results[0],
                        book: results[1],
                        faktur: results[2],
                        memberCode: id,
                    });
                }
            );
            connection.release();
        });
    },
    data(req, res) {
        let id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT buku, kode_buku, judul, jumlah FROM table_temporary
                JOIN table_book ON buku=id_buku WHERE kd_anggota = ${id};
                `,
                function (error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil ambil data!',
                        data: results,
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
                `INSERT INTO table_peminjaman SET ? `,
                {
                    faktur: req.body.faktur,
                    t_peminjaman: req.body.loanDate,
                    t_kembali: req.body.returnDate,
                    anggota_kode: req.body.memberCode,
                    user_id: req.body.userid,
                },
                function (error, results) {
                    if (error) throw error;
                    res.send();
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
                    res.send({
                        success: true,
                        message: 'Berhasil ambil data!',
                    });
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
    // deleteTemp(req, res) {
    //     pool.getConnection(function (err, connection) {
    //         if (err) throw err;
    //         connection.query(
    //             `DELETE FROM table_peminjaman
    //             WHERE id_peminjaman = ?`,
    //             [req.body.id],
    //             function (error, results) {
    //                 if (error) throw error;
    //                 res.redirect('/loan');
    //             }
    //         );
    //         connection.release();
    //     });
    // },
    deleteAll(req, res) {
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
