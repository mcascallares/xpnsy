define(['jquery', 'moment'], function($, moment) {

	var formatDate = function() {
	  return function(attributeName) {
	  	var ts = this[attributeName.trim()];
	    return moment(new Date(ts)).format('MMMM Do YYYY');
	  }
	};

	var formatCurrency = function() {
	  return function(attributeName) {
	  	var amount = this[attributeName.trim()];
	    return amount.toFixed(2);
	  }
	};

	var data = function(attributes) {
		return $.extend({
			formatDate: formatDate,
			formatCurrency: formatCurrency
		}, attributes);
	};

	return {
		data: data
	};
});