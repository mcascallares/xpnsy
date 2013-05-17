requirejs.config({
  shim: {
    "underscore": { exports: "_" },
    "backbone": {
      deps: ["underscore", "jquery"],
      exports: 'Backbone'
    },
    "backbone.validation": {
      deps: ["backbone"],
      exports: 'Backbone.Validation'
    }
  },

  paths: {
    "jquery": "jquery",
    "backbone.validation": "backbone-validation",
    "moment": "moment.min"
  },

  hgn: {
    templateExtension: ".html"
  },

  name: "app",
  out: "app.min.js"

});

requirejs(["jquery",
  "xpnsy/dashboard",
  "foundation/foundation.min"
  ], function ($, dashboard) {

    $(document).foundation();

    // TODO add a dispatcher logic here to know which AMD we have to init
    if (window.location.href.indexOf("/dashboard") !== -1) {
      //console.log(dashboard);
      dashboard.init()
    }
});