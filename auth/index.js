var config = require('../config')
	, FacebookStrategy = require('passport-facebook').Strategy
	, UserModel = require('../models/user').UserModel;


module.exports = function(passport){
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
};