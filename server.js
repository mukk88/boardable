
/**
 * Module dependencies.
 */

var flash = require('connect-flash');
var express = require('express');
var view = require('./routes/view');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var db = require('./routes/database');

var app = express();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = db.getUserVar();
var pwhash = db.getHash();

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  done(null, id);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if(!pwhash.verify(password, user.pw)){
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('keyboard dog'));
app.use(express.session());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', ensureAuthenticated, view.index);
app.get('/login', view.login);
app.post('/login',passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash:true}));
app.get('/logout', view.logout);
app.post('/create', db.postCreate);
app.get('/game/:id',ensureAuthenticated, view.game);
app.get('/game/:gameid/user/:userid', ensureAuthenticated, view.hand);
app.get('/connect4', view.connect4);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}