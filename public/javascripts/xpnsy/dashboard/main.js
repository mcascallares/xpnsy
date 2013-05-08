define(['jquery', 'underscore', 'xpnsy/api/label'], function($, _, label) {

  var showLabels = function() {
    label.retrieveLabels().done(function(response) {
      if (response.success) {
        _.each(response.data, function(label){
          console.log(label.name);
        });
      }
    });
  };

  return {
    color: "blue",
    showLabels: showLabels
  };

});