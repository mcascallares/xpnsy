var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, findOrCreate = require('mongoose-findorcreate');


var labelSchema = new Schema({
	name: { type: String, required: true},
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true}
});
labelSchema.plugin(findOrCreate);

labelSchema.index({user : 1});

labelSchema.statics.findByUser = function (user, callback) {
	this.find({ user: user })
	.sort('name')
	.exec(callback);
}


exports.Label = mongoose.model('Label', labelSchema, 'labels');