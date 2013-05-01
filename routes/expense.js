var Expense = require('../models/expense').Expense;

exports.create = function(req, res) {
	var expense = new Expense({
		amount: 123,
		user: req.user.id
	});
	expense.save(function(err, expense) {
    if (err) throw err;
    res.json({ success: true , data: expense });
  });
};