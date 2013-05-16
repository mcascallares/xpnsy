var Expense = require('../models/expense').Expense;

exports.create = function(req, res) {
	var expense = new Expense({
		label: req.body.label,
		amount: req.body.amount,
		user: req.user.id
	});
	expense.save(function(err, expense) {
    if (err) throw err;
    res.json({ success: true , data: expense });
  });
};


exports.list = function(req, res) {
	var limit = req.params.limit  || 10;
	var offset = req.params.offset  || 0;
	Expense.latestsByUser(req.user.id, limit, offset, function(err, expenses) {
		if (err) throw err;
		res.json({ success: true , data: expenses });
	});
};