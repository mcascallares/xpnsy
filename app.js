var express = require('express')
  , config = require('./config')
  , mongoose = require('mongoose')
	, passport = require('passport')
  , MongoStore = require('connect-mongo')(express)
	, ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
  , ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut
	, FacebookStrategy = require('passport-facebook').Strategy
  , UserModel = require('./models/user').UserModel
  , sitemap = require('./sitemap')
  , http = require('http')
  , path = require('path');


// db connection initialization
mongoose.connect(config.mongo.uri);

// express setup
var app = express();
app.set('port', config.port);
app.engine('html', require('hogan-express'));
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('layout', 'layout'); // rendering by default as layout for all views
app.set('partials', {topbar: 'topbar', footer: 'footer'}); // partails using by default on all pages
app.disable('view cache');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(config.cookieSecret));
app.use(express.session({
    secret: config.cookieSecret,
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore({
      mongoose_connection : mongoose.connections[0]
    })
}));
app.use(passport.initialize());
app.use(passport.session());
// middleware to make loggedInUser available in templates
app.use(function(req, res, next) {
  res.locals.loggedInUser = req.user;
  next();
});

app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// error handler for development only
if ('development' == app.get('env')) { app.use(express.errorHandler()); }


// authentication
passport.serializeUser(function(userSessionInfo, done) { done(null, userSessionInfo); });
passport.deserializeUser(function(userSessionInfo, done) { done(null, userSessionInfo); });

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    UserModel.findOrCreate({provider: profile.provider, providerId: profile.id},
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


// build the sitemap using routing
sitemap.addRoutes(app, passport);


// finally start your engines!
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
