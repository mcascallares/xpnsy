var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, findOrCreate = require('mongoose-findorcreate');


var userSchema = new Schema({
	provider: { type: String, required: true },
	providerId: { type: String, required: true }
});
userSchema.plugin(findOrCreate);

userSchema.index({provider: 1, providerId: 1});

exports.User = mongoose.model('User', userSchema, 'users');