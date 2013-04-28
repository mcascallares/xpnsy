
/**
 * Module dependencies.
 */

var express = require('express')
	, passport = require('passport')
	, ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
	, FacebookStrategy = require('passport-facebook').Strategy
  , routes = require('./routes')
  , auth = require('./routes/auth')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// custom for passport, put this in other place?
passport.use(new FacebookStrategy({
    clientID: 493919190675289,
    clientSecret: 'a3db1fbac3d4907b207ba3dd980e74e1',
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // NOTE: You'll probably want to associate the facebook profile with a user record in your application's DB.
    var user = profile;
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// route mapping
app.get('/', routes.index);
app.get('/login', auth.login);
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', 
	{ successRedirect: '/', failureRedirect: '/login' }));
app.get('/account', ensureLoggedIn('/login'), auth.account);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
