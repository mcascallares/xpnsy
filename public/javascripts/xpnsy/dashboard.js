define(['xpnsy/widgets/chart-expense/widget',
	'xpnsy/widgets/create-expense/widget',
	'xpnsy/widgets/list-expense/widget',
	'xpnsy/models'],

	function(chartWidget, createWidget, listWidget, models) {

		var init = function() {
			new chartWidget.ExpensePieChartView({
				el: $('#chart-expense-widget')
			});

			// bootstrap data following bootstrap convention
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