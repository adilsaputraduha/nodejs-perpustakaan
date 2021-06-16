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
                SELECT COUNT(kode_anggota) AS jmlrecord FROM table_anggota;
                SELECT COUNT(kode_buku) AS jmlrecord FROM table_book;
                SELECT COUNT(id_peminjaman) AS jmlrecord FROM table_peminjaman;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('report', {
                        url: URL,
                        // userName: req.session.username,
                        userId: req.session.id_user,
                        anggota: results[0],
                        buku: results[1],
                        peminjaman: results[2],
                    });
                }
            );
            connection.release();
        });
    },
    member(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM table_anggota;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('report/member-report', {
                        url: URL,
                        // userName: req.session.username,
                        userId: req.session.id_user,
                        member: results,
                    });
                }
            );
            connection.release();
        });
    },
    book(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM table_book JOIN table_category ON kategori=id_kategori;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('report/book-report', {
                        url: URL,
                        // userName: req.session.username,
                        userId: req.session.id_user,
                        book: results,
                    });
                }
            );
            connection.release();
        });
    },
    loan(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM table_peminjaman JOIN table_anggota ON kode_anggota=anggota_kode 
                JOIN table_user ON id_user=user_id;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('report/loan-report', {
                        moment: moment,
                        url: URL,
                        // userName: req.session.username,
                        userId: req.session.id_user,
                        loan: results,
                    });
                }
            );
            connection.release();
        });
    },
    faktur(req, res) {
        let id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT id_peminjaman, faktur, t_peminjaman, t_kembali, nama_anggota, 
                name, buku_id, judul, kode_buku, nama_kategori, jumlah 
                FROM table_peminjaman
                JOIN table_detailpeminjaman ON faktur=faktur_detail 
                JOIN table_book ON id_buku=buku_id
                JOIN table_category ON id_kategori=kategori
                JOIN table_anggota ON kode_anggota=anggota_kode
                JOIN table_user ON id_user=user_id WHERE id_peminjaman=${id};
                SELECT faktur, t_peminjaman, t_kembali, nama_anggota FROM table_peminjaman 
                JOIN table_anggota ON kode_anggota=anggota_kode 
                WHERE id_peminjaman=${id} GROUP BY faktur;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('report/faktur-report', {
                        url: URL,
                        moment: moment,
                        // userName: req.session.username,
                        id: id,
                        userId: req.session.id_user,
                        faktur: results[0],
                        member: results[1],
                    });
                }
            );
            connection.release();
        });
    },
};
