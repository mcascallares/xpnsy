require(['main',
	'xpnsy/widgets/chart-expense/widget',
	'xpnsy/widgets/create-expense/widget',
	'xpnsy/widgets/list-expense/widget',
	'xpnsy/models'],

	function(main, chartWidget, createWidget, listWidget, models) {
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
	}
);