var Expense = require('../models/expense').Expense;

exports.create = function(req, res) {
	console.log(req.body.type);
	var expense = new Expense({
		label: req.body.label,
		amount: req.body.type === 'income' ? req.body.amount : req.body.amount * -1,
		when: req.body.when,
		user: req.user.id
	});
	console.log(expense);
	expense.save(function(err, expense) {
    if (err) throw err;
    expense.populate('label', function(err, fullExpense) {
    	res.json(fullExpense);
    });
  });
};


exports.list = function(req, res) {
	var limit = req.params.limit  || 10;
	var offset = req.params.offset  || 0;
	Expense.findByUser(req.user.id, limit, offset, function(err, expenses) {
		if (err) throw err;
		res.json(expenses);
	});
};