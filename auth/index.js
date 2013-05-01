var config = require('../config')
	, FacebookStrategy = require('passport-facebook').Strategy
	, User = require('../models/user').User;


var onFacebookCallback = function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({provider: profile.provider, providerId: profile.id},
    function(err, user, created) {
      if (err) { return done(err); }
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
};

module.exports = function(passport){
	passport.serializeUser(function(userSessionInfo, done) {
		done(null, userSessionInfo);
	});
	passport.deserializeUser(function(userSessionInfo, done) {
		done(null, userSessionInfo);
	});
	passport.use(new FacebookStrategy({
	    clientID: config.facebook.clientID,
	    clientSecret: config.facebook.clientSecret,
	    callbackURL: config.facebook.callbackURL
	  }, onFacebookCallback));
};