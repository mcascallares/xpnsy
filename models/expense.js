var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, timestamps = require('mongoose-timestamp');


var expenseSchema = new Schema({
	amount: { type: Number, required: true },
	label: { type: Schema.Types.ObjectId, ref: 'Label', required: true},
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true}
});
expenseSchema.plugin(timestamps); // adds createdAt and updatedAt fields

exports.Expense = mongoose.model('Expense', expenseSchema, 'expenses');