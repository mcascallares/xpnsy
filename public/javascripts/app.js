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
    },
    "foundation/jquery.event.move": { deps: ["jquery"] },
    "foundation/jquery.event.swipe": { deps: ["jquery"] },
    "foundation/jquery.foundation.accordion": { deps: ["jquery"] },
    "foundation/jquery.foundation.alerts": { deps: ["jquery"] },
    "foundation/jquery.foundation.buttons": { deps: ["jquery"] },
    "foundation/jquery.foundation.clearing": { deps: ["jquery"] },
    "foundation/jquery.foundation.forms": { deps: ["jquery"] },
    "foundation/jquery.foundation.joyride": { deps: ["jquery"] },
    "foundation/jquery.foundation.magellan": { deps: ["jquery"] },
    "foundation/jquery.foundation.mediaQueryToggle": { deps: ["jquery"] },
    "foundation/jquery.foundation.navigation": { deps: ["jquery"] },
    "foundation/jquery.foundation.orbit": { deps: ["jquery"] },
    "foundation/jquery.foundation.reveal": { deps: ["jquery"] },
    "foundation/jquery.foundation.tabs": { deps: ["jquery"] },
    "foundation/jquery.foundation.tooltips": { deps: ["jquery"] },
    "foundation/jquery.foundation.topbar": { deps: ["jquery"] },
    "foundation/jquery.placeholder": { deps: ["jquery"] },
    "foundation/foundation-datepicker": { deps: ["jquery"] }
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
  "foundation/foundation.min",
  "foundation/foundation-datepicker"
  ], function ($, foundation) {
    $(document).foundation();
});