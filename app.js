var express = require('express')
  , config = require('./config')
  , mongoose = require('mongoose')
	, passport = require('passport')
	, ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
	, FacebookStrategy = require('passport-facebook').Strategy
  , user = require('./models/user')
  , routes = require('./routes')
  , auth = require('./routes/auth')
  , http = require('http')
  , path = require('path');


// express setup
var app = express();
app.set('port', config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(config.cookieSecret));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// error handler for development only
if ('development' == app.get('env')) { app.use(express.errorHandler()); }

// database
mongoose.connect(config.mongo.uri);

// authentication
passport.serializeUser(function(userSessionInfo, done) { done(null, userSessionInfo); });
passport.deserializeUser(function(userSessionInfo, done) { done(null, userSessionInfo); });

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    user.UserModel.findOrCreate({provider: profile.provider, providerId: profile.id}, 
      function(err, user, created) {
        if (err) { return done(err); }
        // build the user session to avoid sync info between social provider and our db
        done(null, { 
          id:user.id, 
          info: {
            provider: profile.provider,
            providerId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            name: profile.name,
            link: profile.link,
            gender: profile.gender
          }
        });
    });  
}));


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
