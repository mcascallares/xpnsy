var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, timestamps = require('mongoose-timestamp')
	, Label = require('./label').Label;


var expenseSchema = new Schema({
		amount: { type: Number, required: true },
		label: { type: Schema.Types.ObjectId, ref: 'Label', required: true},
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true}
});
expenseSchema.plugin(timestamps);
expenseSchema.virtual('updatedAtMs').get(function () {
    return this.updatedAt.getTime();
});
expenseSchema.set('toObject', { getters: true });
expenseSchema.set('toJSON', { getters: true });


expenseSchema.pre('save', function(next) {
	var expense = this;

	// validates that label belongs to the expense user
	Label.findById(expense.label, function(err, label) {
		if (err) return next(err);
		if (label.user.equals(expense.user)) {
			next();
		} else {
			next(new Error('The specified label does not belong to the user, are you trying to hack it?'));
		}
	});
});

expenseSchema.statics.findByUser = function(user, limit, offset, callback) {
	this.find({ user: user }).populate('label')
		.sort('-updatedAt')
		.limit(limit)
		.skip(offset)
		.exec(callback);
}


exports.Expense = mongoose.model('Expense', expenseSchema, 'expenses');