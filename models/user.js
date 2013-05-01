var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, findOrCreate = require('mongoose-findorcreate');


var userSchema = new Schema({
	provider: { type: String, required: true },
	providerId: { type: String, required: true }
});
userSchema.plugin(findOrCreate);


exports.User = mongoose.model('User', userSchema, 'users');
