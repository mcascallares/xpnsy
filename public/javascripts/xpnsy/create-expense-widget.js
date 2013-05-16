define(['backbone',
  'backbone.validation',
  'xpnsy/models',
  'hgn!xpnsy/templates/create-expense-widget'],
  function(Backbone, validation, models, createExpenseTemplate) {

    var CreateExpenseView = Backbone.View.extend({

      id: null,
      template: createExpenseTemplate,

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
        var me = this;
        $.get('/labels').done(function(response) {
          if (response.success) {
            var context = {
              labels: response.data
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
        var self = this;
        this.model.save(null, {
          success: function(expense) {
            // insert and remove the last to keep the page with constant size
            console.log(expense);
            self.collection.add(expense);
            var last = self.collection.at(self.collection.length - 1);
            self.collection.remove(last);

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