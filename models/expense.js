var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, timestamps = require('mongoose-timestamp')
	, Label = require('./label').Label;


var expenseSchema = new Schema({
	amount: { type: Number, required: true },
	label: { type: Schema.Types.ObjectId, ref: 'Label', required: true},
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true}
});
expenseSchema.plugin(timestamps); // adds createdAt and updatedAt fields

expenseSchema.pre('save', function(next) {
	var expense = this;
	Label.findById(expense.label, function(err, label) {
		if (err) return next(err);
		if (label.user.equals(expense.user)) {
			next();
		} else {
			next(new Error('The specified label does not belong to the user, are you trying to hack it?'));
		}
	});
});

exports.Expense = mongoose.model('Expense', expenseSchema, 'expenses');