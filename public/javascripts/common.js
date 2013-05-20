requirejs.config({
  baseUrl: "javascripts",

  paths: {
    "jquery": "require-jquery",
    "hogan": "hogan/hogan",
    "hgn": "requirejs-plugins/hgn",
    "text": "requirejs-plugins/text",
    "goog": "requirejs-plugins/goog",
    "async": "requirejs-plugins/async",
    "propertyParser": "requirejs-plugins/propertyParser",
    "foundation": "foundation/foundation.min",
    "foundation.datepicker": "foundation/foundation-datepicker",
    "underscore": "underscore/underscore",
    "backbone": "backbone/backbone",
    "backbone.validation": "backbone/backbone-validation",
    "moment": "moment/moment.min"

  },

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

  hgn: {
    templateExtension: ".html"
  }

});