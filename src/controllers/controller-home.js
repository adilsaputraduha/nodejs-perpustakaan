module.exports = {
    home(req, res) {
        res.render('home', {
            url: 'http://localhost:8080/',
            userName: req.session.username,
        });
    },
};
