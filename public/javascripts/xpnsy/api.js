define(['jquery'], function($) {

	var retrieveLabels = function() {
		return $.get('/labels')
	};

	var postExpense = function(expense) {
		return $.post('/expenses', expense);
	}

  return {
    retrieveLabels: retrieveLabels,
    postExpense: postExpense
  };

});