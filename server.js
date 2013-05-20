var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , MongoStore = require('connect-mongo')(express)
	, passport = require('passport')
  , auth = require('./auth')(passport)
  , sitemap = require('./sitemap')
  , config = require('./config');

// db connection initialization
mongoose.connect(config.mongo.uri, {replSet: {socketOptions: {socketTimeoutMS: 200000}}});

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
// app.use(express.session({
//     secret: config.cookieSecret,
//     maxAge: new Date(Date.now() + 3600000),
//     store: new MongoStore({ mongoose_connection : mongoose.connections[0] })
// }));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.loggedInUser = req.user;
  next();
});
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));


// error handler and db debug for development only
if ('development' == app.get('env')) {
  mongoose.set('debug', true)
  app.use(express.errorHandler())
}


// sitemap configuration
sitemap.addRoutes(app, passport);


// start the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
