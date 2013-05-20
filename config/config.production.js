// default configuration file (development is default)
var config = module.exports = {};

config.env = 'production';
config.host = 'xpnsy.azurewebsites.net';
config.port = process.env.PORT;
config.cookieSecret = process.env.CookieS;

//mongo database
config.mongo = {
	uri: process.env.CUSTOMCONNSTR_MONGOLAB_URI
};

// facebook integration
config.facebook = {
	clientID: 493919190675289,
	clientSecret: process.env.FacebookClientSecret,
	callbackURL: 'http://' + config.host + '/auth/facebook/callback'
}