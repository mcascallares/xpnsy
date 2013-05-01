var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, timestamps = require('mongoose-timestamp');


var expenseSchema = new Schema({
	amount: { type: Number, required: true },
	user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
});

expenseSchema.plugin(timestamps); // adds createdAt and updatedAt fields


exports.Expense = mongoose.model('Expense', expenseSchema, 'expenses');
