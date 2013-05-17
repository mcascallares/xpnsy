define(['backbone',
  'backbone.validation',
  'xpnsy/models',
  'xpnsy/template.helper',
  'hgn!./templates/create-dialog'],
  function(Backbone, validation, models, templateHelper, dialogTemplate) {

    var CreateExpenseView = Backbone.View.extend({

      id: null,
      template: dialogTemplate,

      initialize: function() {
        this.model = new models.Expense();
        this.render();
        _.bindAll(this, 'changed');
      },

      render: function() {
        Backbone.Validation.bind(this, {
          valid: function(view, attr) {
            view.$('.js-cg-' + attr).removeClass('error');
          },
          invalid: function(view, attr, error) {
            view.$('.js-cg-' + attr).addClass('error');
          }
        });

        var self = this;
        $.get('/labels').done(function(response) {
          var templateData = templateHelper.data({
            labels: response
          });
          self.$el.html(self.template(templateData));
          $('.js-datepicker').fdatepicker('setValue', new Date());
        });
        return this;
      },


      events: {
        'click .js-submit': 'submit',
        'change input': 'changed',
        'change select': 'changed',
        'changeDate': 'changed' // required by the datepicker
      },


      changed:function(evt) {
        var changed = evt.currentTarget;
        var value = $(evt.currentTarget).val();
        var obj = {};
        obj[changed.name] = value;
        this.model.set(obj);
      },

      submit: function() {
        console.log(this.model);
        var self = this;
        this.model.save(null, {
          success: function(expense) {
            self.collection.add(expense);
            // re-start the model for a new expense
            self.initialize();
          }
        });
      }

    });


    return {
      CreateExpenseView: CreateExpenseView
    };

  }
);