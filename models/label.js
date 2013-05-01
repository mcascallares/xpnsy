var mongoose = require('mongoose')
	, Schema = mongoose.Schema;


var labelSchema = new Schema({
	name: { type: String, required: true},
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true}
});

exports.Label = mongoose.model('Label', labelSchema, 'labels');