require(['main',
	'xpnsy/widgets/chart-movement/widget',
	'xpnsy/widgets/create-movement/widget',
	'xpnsy/widgets/list-movement/widget',
	'xpnsy/models'],

	function(main, chartWidget, createWidget, listWidget, models) {


		// bootstrap data following bootstrap convention
		$.get('/movements').done(function(response) {
			var movements = new models.MovementCollection(response);

			new createWidget.CreateMovementView({
				collection: movements,
				el: $('#create-movement-widget')

			});

			new listWidget.ListMovementView({
				collection: movements,
				el: $('#list-movement-widget')
			});

			new chartWidget.ChartView({
				collection: movements,
				el: $('#chart-widget')
			});
		});
	}
);