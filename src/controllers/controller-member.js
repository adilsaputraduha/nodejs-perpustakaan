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
                SELECT * FROM table_anggota;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('member', {
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
    save(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `INSERT INTO table_anggota SET ? `,
                {
                    kode_anggota: req.body.code,
                    nama_anggota: req.body.name,
                    alamat: req.body.address,
                },
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/member');
                }
            );
            connection.release();
        });
    },
    update(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `UPDATE table_anggota SET
                nama_anggota = ?,
                alamat = ?
            WHERE kode_anggota = ?`,
                [req.body.name, req.body.address, req.body.code],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/member');
                }
            );
            connection.release();
        });
    },
    delete(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `DELETE FROM table_anggota
                WHERE kode_anggota = ?`,
                [req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/member');
                }
            );
            connection.release();
        });
    },
};
