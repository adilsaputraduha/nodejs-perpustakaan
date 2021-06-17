const login = require('./controller-login');
const home = require('./controller-home');
const member = require('./controller-member');
const category = require('./controller-category');
const book = require('./controller-book');
const user = require('./controller-user');
const loan = require('./controller-loan');
const report = require('./controller-report');
const logout = require('./controller-logout');

module.exports = {
    login,
    home,
    member,
    category,
    book,
    user,
    loan,
    report,
    logout,
};
