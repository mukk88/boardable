//required
var flash = require('connect-flash');
var express = require('express');
var view = require('./routes/view');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var io = require('socket.io');
var db = require('./routes/database');

var app = express();
var sio = require('socket.io');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = db.getUserVar();
var pwhash = db.getHash();

//passport
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

//app setup
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

//routes
app.get('/', ensureAuthenticated, db.getAllGames);
app.get('/login', view.login);
app.post('/login',passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash:true}));
app.get('/logout', view.logout);
app.post('/create', db.createUser);
app.get('/allGames', ensureAuthenticated, db.getAllGames);
app.get('/game/:id',ensureAuthenticated, db.viewGame);
app.post('/game', db.createGame);
app.get('/game/:gameid/user', ensureAuthenticated, db.joinGame);
app.get('/connect4', view.connect4);

//server and io
// var server = http.createServer(app);
// var io = require('socket.io').listen(server);
// server.listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });


app.listen(app.get('port'),function(){
  console.log('express server listening on ' + app.get('port'));
});

var io = sio.listen(app);

db.setupIO(io);
db.setPort(app.get('port'));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}