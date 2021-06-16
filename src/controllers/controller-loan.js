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
                SELECT COUNT(id_buku) AS jmlrecord FROM table_book;
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
    save(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO table_detailpeminjaman 
                SELECT faktur, buku, jumlah FROM table_temporary 
                WHERE faktur = ${req.body.faktur} AND kd_anggota = ${req.body.memberCode};
                INSERT INTO table_peminjaman (faktur, t_peminjaman, t_kembali, anggota_kode, user_id)
                VALUES ('${req.body.faktur}','${req.body.loanDate}','${req.body.returnDate}','${req.body.memberCode}','${req.body.userid}');
                DELETE FROM table_temporary WHERE faktur = ${req.body.faktur} AND kd_anggota = ${req.body.memberCode};
                `,
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
    temp(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `INSERT INTO table_temporary SET ? `,
                {
                    faktur: req.body.faktur,
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
    updateList(req, res) {
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
    deleteTemp(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `DELETE FROM table_temporary
                WHERE kd_anggota = ? AND buku = ?`,
                [req.body.memberCode, req.body.bookCodeTemp],
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
    deleteAll(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM table_peminjaman
                WHERE id_peminjaman = ${req.body.id};
                DELETE FROM table_detailpeminjaman
                WHERE faktur_detail = ${req.body.faktur};
                `,
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/loan');
                }
            );
            connection.release();
        });
    },
};
