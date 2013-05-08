define(['jquery',
  'underscore',
  'xpnsy/api'], function($, _, api) {

  var showLabels = function() {
    api.retrieveLabels().done(function(response) {
      if (response.success) {
        _.each(response.data, function(label){
          console.log(label.name);
        });
      }
    });
  };


  var init = function() {
    showLabels();
  };

  return {
    init: init
  };

});