//'use strict';
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var logout = require('express-passport-logout');


var welcome = require('./routes/welcome');
var bye = require('./routes/bye');
var welcomenotlogin = require('./routes/welcomenotlogin');

var routes = require('./routes/index');
var users = require('./routes/users');

// Init App
var app = express();

// View Engine handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/bye');
  });
});

// Routes
app.use('/', routes);
app.use('/welcome', welcome);
app.use('/bye', bye);
app.use('/welcomenotlogin', welcomenotlogin);
app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port') + '. Please open: http://localhost:3000/welcome');
});
