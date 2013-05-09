define(['jquery',
  'underscore',
  'xpnsy/api',
  'hgn!xpnsy/templates/dashboard/expense-widget',
  'hgn!xpnsy/templates/dashboard/history-widget'],
   function($, _, api, expenseWidget, historyWidget) {

  var attachListeners = function(container) {
    $('.js-submit', container).click(function() {
      var labelComponent = $('select[name=label]', container);
      var amountComponent = $('input[name=amount]', container);
      api.postExpense({
        label: labelComponent.val(),
        amount: amountComponent.val()
      }).done(function() {
        amountComponent.val('');
      });
    });
  };


  var renderExpenseWidget = function(container) {
    api.retrieveLabels().done(function(response) {
      if (response.success) {
        var options = _.map(response.data, function(label){
          return { label: label.name, value: label._id };
        });
        container.html(expenseWidget({ options: options }));
        attachListeners(container);
      }
    });
  };


  var renderHistoryWidget = function(container) {
    container.html(historyWidget({}));
  };


  var init = function() {
    var expenseWidgetContainer = $('#expense-widget');
    var historyWidgetContainer = $('#history-widget');
    renderExpenseWidget(expenseWidgetContainer);
    renderHistoryWidget(historyWidgetContainer);
  };


  return {
    init: init
  };

});