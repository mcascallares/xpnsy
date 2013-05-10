// configuration sample file, replace 'sample' per environment
var config = module.exports = {};

config.env = 'development';
config.host = 'localhost';
config.port = 3000;
config.cookieSecret = 'here_you_put_a_long_cookie_secret';

//mongo database
config.mongo = {
	uri: 'mongodb://host/database'
};

// facebook integration
config.facebook = {
	clientID: 1234567890,
	clientSecret: 'here_you_put_your_secret',
	callbackURL: 'http://' + config.host + ':' + config.port + '/auth/facebook/callback'
}
