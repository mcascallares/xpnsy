define(['backbone',
  'backbone.validation',
  'hgn!xpnsy/templates/create-expense-widget'],
  function(Backbone, validation, createExpenseTemplate) {

    // put models in a separate AMD?
    var Expense = Backbone.Model.extend({

        urlRoot : '/expenses',

        defaults: {
          label: null,
          amount: null
        },

        validation: {
          label: {
            required: true
          },
          amount: {
            required: true
          }
        }
    });


    var CreateExpenseView = Backbone.View.extend({

      id: null,
      template: createExpenseTemplate,

      initialize: function() {
        this.model = new Expense();
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
        var me = this;
        $.get('/labels').done(function(response) {
          if (response.success) {
            var context = {
              labels: response.data,
              expense: me.model
            };
            me.$el.html(me.template(context));
          }
        });
        return this;
      },


      events: {
        'click .js-submit' : 'submit',
        'change input' : 'changed',
        'change select' : 'changed'
      },


      changed:function(evt) {
        var changed = evt.currentTarget;
        var value = $(evt.currentTarget).val();
        var obj = {};
        obj[changed.name] = value;
        this.model.set(obj);
      },

      submit: function() {
        this.model.save();
      }

    });


    return {
      CreateExpenseView: CreateExpenseView
    };

  }
);