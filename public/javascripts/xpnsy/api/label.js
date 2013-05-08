define(['jquery'], function($) {

	var retrieveLabels = function() { return $.get("/labels") };

  return {
    retrieveLabels: retrieveLabels
  };

});