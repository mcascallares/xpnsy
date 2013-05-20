define([
	'jquery',
  'foundation',
  'foundation.datepicker',
	'xpnsy/widgets/chart-movement/widget',
	'xpnsy/widgets/create-movement/widget',
	'xpnsy/widgets/list-movement/widget',
	'xpnsy/models'],

	function($, foundation, foundationDatePicker,
		chartWidget, createWidget, listWidget, models) {

		$(function() {
			$(document).foundation();

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
		});
	}
);