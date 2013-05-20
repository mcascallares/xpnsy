var Movement = require('../models/movement').Movement;

exports.create = function(req, res) {
	var movement = new Movement({
		label: req.body.label,
		amount: req.body.type === 'income' ? req.body.amount : -req.body.amount,
		when: req.body.when,
		user: req.user.id
	});
	movement.save(function(err, movement) {
    if (err) throw err;
    movement.populate('label', function(err, fullMovement) {
    	res.json(fullMovement);
    });
  });
};

exports.list = function(req, res) {
	var limit = req.params.limit  || 20;
	var offset = req.params.offset  || 0;
	Movement.findByUser(req.user.id, limit, offset, function(err, movements) {
		if (err) throw err;
		res.json(movements);
	});
};

var getSince = function(req) {
	var period = req.params.period;
	var now = new Date();
	var since = null;
	if (period == 'month') {
		since = new Date(now.getFullYear(), now.getMonth(), 1);
	} else if (period == 'year') {
		since = new Date(now.getFullYear(), 0, 1);
	}
	return since;
};

exports.totalExpensesPerLabel = function(req, res) {
	Movement.totalExpensesPerLabel(req.user.id, getSince(req), function(err, totals) {
		if (err) throw err;
		res.json(totals);
	});
};

exports.totalIncomesPerLabel = function(req, res) {
	Movement.totalIncomesPerLabel(req.user.id, getSince(req), function(err, totals) {
		if (err) throw err;
		res.json(totals);
	});
};