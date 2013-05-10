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

exports.totalsByMonth = function(req, res) {
	Expense.totalsByMonth(req.user.id, 5, function(err, response) {
		res.json(response);
	});
};