var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
  , ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut
	, home = require('../routes/home')
  , dashboard = require('../routes/dashboard');


exports.addRoutes = function(app, passport) {
	app.get('/', ensureLoggedOut('/dashboard'), home.show);
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook',
  	{ successRedirect: '/dashboard', failureRedirect: '/' }));
	app.get('/logout', home.logout);
	app.get('/dashboard', ensureLoggedIn('/'), dashboard.show);
};