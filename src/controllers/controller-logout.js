module.exports = {
    logout(req, res) {
        // Hapus sesi user dari broser
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            // Hapus cokie yang masih tertinggal
            res.clearCookie('secretname');
            res.redirect('/login');
        });
    },
};
