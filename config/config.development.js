var config = module.exports = {};

config.env = 'development';
config.host = 'localhost';
config.port = 3000;
config.cookieSecret = 'lsdkdslkjdsklsjfoee239-092fewjwefkmf';

//mongo database
config.mongo = {
	uri: 'mongodb://localhost/xpnsy'
};

// facebook integration
config.facebook = {
	clientID: 493919190675289,
	clientSecret: 'a3db1fbac3d4907b207ba3dd980e74e1',
	callbackURL: 'http://' + config.host + ':' + config.port + '/auth/facebook/callback'
}
