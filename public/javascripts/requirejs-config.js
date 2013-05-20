requirejs.config({
  baseUrl: "javascripts",

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
    "hogan": "hogan/hogan",
    "hgn": "requirejs-plugins/hgn",
    "text": "requirejs-plugins/text",
    "goog": "requirejs-plugins/goog",
    "async": "requirejs-plugins/async",
    "propertyParser": "requirejs-plugins/propertyParser",
    "jquery": "jquery/jquery",
    "foundation": "foundation/foundation.min",
    "foundation.datepicker": "foundation/foundation-datepicker",
    "underscore": "underscore/underscore",
    "backbone": "backbone/backbone",
    "backbone.validation": "backbone/backbone-validation",
    "moment": "moment/moment.min"
  },

  hgn: {
    templateExtension: ".html"
  }

});