const login = require('./controller-login');
const home = require('./controller-home');
const member = require('./controller-member');
const category = require('./controller-category');
const book = require('./controller-book');
const loan = require('./controller-loan');
const report = require('./controller-report');

module.exports = {
    login,
    home,
    member,
    category,
    book,
    loan,
    report,
};
