var mongoose = require('mongoose')
	, findOrCreate = require('mongoose-findorcreate');


mongoose.connect('mongodb://localhost/xpnsy');


var UserSchema = new mongoose.Schema({
	provider: { type: String, required: true },
	providerId: { type: String, required: true }
});
UserSchema.plugin(findOrCreate);


exports.UserModel = mongoose.model('UserModel', UserSchema, 'user');

