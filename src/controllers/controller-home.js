const config = require('../configs/database');
const moment = require('moment');

let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    home(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT COUNT(id_kategori) AS jmlrecord FROM table_category;
                SELECT COUNT(id_buku) AS jmlrecord FROM table_book;
                SELECT COUNT(kode_anggota) AS jmlrecord FROM table_anggota;
                SELECT COUNT(id_user) AS jmlrecord FROM table_user;
                SELECT * FROM table_user;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('home', {
                        url: URL,
                        // userName: req.session.username,
                        userId: req.session.id_user,
                        category: results[0],
                        book: results[1],
                        member: results[2],
                        user: results[3],
                        userList: results[4],
                    });
                }
            );
            connection.release();
        });
    },
};
