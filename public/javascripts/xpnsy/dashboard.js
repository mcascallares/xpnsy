define([
	'xpnsy/widgets/create-expense/widget',
	'xpnsy/widgets/list-expense/widget',
	'xpnsy/models'],

	function(createWidget, listWidget, models) {

		var init = function() {
			// bootstrap data
			$.get('/expenses').done(function(response) {
				var expenses = new models.ExpenseCollection(response);

				new createWidget.CreateExpenseView({
						el: $('#create-expense-widget'),
						collection: expenses
				});

				new listWidget.ListExpenseView({
					collection: expenses,
					el: $('#list-expense-widget')
				});
			});
		};

		return {
			init: init
		};
	}
);