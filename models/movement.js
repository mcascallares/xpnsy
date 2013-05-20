var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = mongoose.Types.ObjectId
	, timestamps = require('mongoose-timestamp')
	, Label = require('./label').Label;


var movementSchema = new Schema({
		amount: { type: Number, required: true },
		label: { type: Schema.Types.ObjectId, ref: 'Label', required: true},
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
		when: { type: Date, required: true},
});
movementSchema.plugin(timestamps);
movementSchema.virtual('updatedAtMs').get(function () {
    return this.updatedAt ? this.updatedAt.getTime() : undefined;
});
movementSchema.virtual('whenMs').get(function () {
    return this.when.getTime();
});
movementSchema.set('toObject', { getters: true });
movementSchema.set('toJSON', { getters: true });

movementSchema.pre('save', function(next) {
	var movement = this;

	// validates that label belongs to the movement user
	Label.findById(movement.label, function(err, label) {
		if (err) return next(err);
		if (label.user.equals(movement.user)) {
			next();
		} else {
			next(new Error('The specified label does not belong to the user, are you trying to hack it?'));
		}
	});
});

movementSchema.index({user : 1, when: -1});
movementSchema.index({when : -1});

movementSchema.statics.findByUser = function(user, limit, offset, callback) {
	this.find({ user: user }).populate('label')
		.sort('-updatedAt')
		.limit(limit)
		.skip(offset)
		.exec(callback);
}

ObjectId = require('mongoose').Types.ObjectId;
movementSchema.statics.totalsPerLabel = function(condition, user, since, callback) {
		var aggregation = [ condition,
			{ $match: {user: new ObjectId(user)}},
			// hack to bypass since condition in case since is null
			since ? { $match: { when: { $gte: since }}} : { $match: { when: { $exists: true }}},
			{ $project: { label: 1, amount: 1, _id: -1}},
	    { $group: { _id: '$label', total: { $sum: '$amount' }}},
	    { $sort: { total: -1 } }
		];
		this.aggregate(aggregation, function(err, totals) {
		if (err) { callback(err) };

		var perLabelId = {}
			, labelIds = [];
		totals.forEach(function(total) {
			labelIds.push(total._id);
			perLabelId[total._id] = Math.abs(total.total);
		});

		Label.find({ '_id': { $in: labelIds} }, function(error, labels) {
			if (error) { callback(error) };
			var ret = labels.map(function(label) {
				return {
					label: label.name,
					total: perLabelId[label._id]
				};
			});
			callback(err, ret);
		});
	});
}

movementSchema.statics.totalExpensesPerLabel = function(user, since, callback) {
	this.totalsPerLabel({ $match: { amount: { '$lt': 0 }}}, user, since, callback);
};

movementSchema.statics.totalIncomesPerLabel = function(user, since, callback) {
	this.totalsPerLabel({ $match: { amount: { '$gt': 0 }}}, user, since, callback);
};

exports.Movement = mongoose.model('Movement', movementSchema, 'movements');