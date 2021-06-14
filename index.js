const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const app = express();

const appRouting = require('./src/routers/app-route');
const loginRouting = require('./src/routers/login-route');
const logoutRouting = require('./src/routers/logout-route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: 't@1k0ch3ng',
        name: 'secretName',
        cookie: {
            sameSite: true,
            maxAge: 10000000,
        },
    })
);
app.use(flash());

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

app.use('/', appRouting);
app.use('/login', loginRouting);
app.use('/logout', logoutRouting);

app.listen(8080, () => {
    console.log('Application running in port : 8080');
});

module.exports = app;
