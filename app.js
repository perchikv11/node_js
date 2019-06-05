var express = require('express');
var app = express();
var config = require('./config');
var bodyParser = require('body-parser');
var routes = require('./routes');
const models = require('./models');
const mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.use(
    session({
        secret: config.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    })
);

app.use('/api/auth', routes.auth);

app.use('/public', express.static('public'));
app.use('/node_modules', express.static('node_modules'));

app.get('/', function(req, res) {
    models.User.find({}).then(users => {
        const sess_id = req.session.userId;
        const sess_login = req.session.userLogin;
        res.render('index', {
            user: {
                sess_id,
                sess_login
            },
            users: users
        });
    });
    
});

app.get('/reg', function(req, res){
    res.render('reg');
});

app.get('/auth', function(req, res){
    res.render('auth');
});

module.exports = app;