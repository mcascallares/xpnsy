define(['backbone',
  'backbone.validation',
  'foundation.datepicker',
  'xpnsy/models',
  'xpnsy/template.helper',
  'hgn!./templates/create-dialog'],
  function(Backbone, validation, datepicker, models, templateHelper, dialogTemplate) {

    var CreateExpenseView = Backbone.View.extend({

      id: null,
      template: dialogTemplate,

      initialize: function() {
        this.model = new models.Expense();
        this.render();
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
        'click .js-submit': 'submit'
      },

      submit: function() {
        var expense = {
          type: $('input[name="type"]:checked', this.$el).val(),
          label: $('select[name="label"]', this.$el).val(),
          when: $('input[name="when"]', this.$el).val(),
          amount: $('input[name="amount"]', this.$el).val()
        };
        this.model.set(expense);
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