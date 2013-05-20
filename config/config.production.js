// default configuration file (development is default)
var config = module.exports = {};

config.env = 'production';
config.host = 'xpnsy.azurewebsites.net';
config.port = process.env.PORT || 3000;
config.cookieSecret = 'aldksdkljdskljsdklsdj-092fewjwefkmf';

//mongo database
config.mongo = {
	uri: 'mongodb://admin:mocosoft123@ds041157.mongolab.com:41157/MongoLab-tr'
};

// facebook integration
config.facebook = {
	clientID: 493919190675289,
	clientSecret: 'a3db1fbac3d4907b207ba3dd980e74e1',
	callbackURL: 'http://' + config.host + '/auth/facebook/callback'
}