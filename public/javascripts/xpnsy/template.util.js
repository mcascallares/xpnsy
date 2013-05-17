define(['moment'], function() {

	var formatDate = function() {
	  return function(tsAttributeName) {
	  	var ts = this[tsAttributeName.trim()];
	    return moment(new Date(ts)).format('MMMM Do YYYY');
	  }
	};

	return {
		formatDate: formatDate
	};
});