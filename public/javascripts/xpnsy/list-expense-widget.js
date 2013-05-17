define(['backbone',
  'xpnsy/template.helper',
  'hgn!xpnsy/templates/expense-item'],
  function(Backbone, templateHelper, itemTemplate) {

    var ExpenseView = Backbone.View.extend({

      template: itemTemplate,

      initialize: function() {
        //_.bindAll(this, 'render', 'otherMethodName', ...);
        this.render();
      },

      render: function() {
        var templateData = templateHelper.data(this.model.attributes);
        this.$el.append(this.template(templateData));
        return this;
      }
    });


    var ListExpenseView = Backbone.View.extend({
      initialize: function() {
        console.log('initialize list');

        // bind the functions 'add' and 'remove' to the view.
        //_(this).bindAll('add', 'remove', 'render');
        _.bindAll(this);

        this.collection.bind('add', this.render);
        this.collection.bind('remove', this.render);
        this.render();
      },

      render: function() {
        console.log('render list');
        console.log(this);
        this.$el.empty();

        var table = $('<table></table>');
        this.collection.each(function(expense) {
          var expenseView = new ExpenseView({
            el: table,
            model: expense
          });
        });
        this.$el.append(table);

        return this;
      },

      reset: function() {
        console.log('reset');
      }

    });


    return {
      ListExpenseView: ListExpenseView
    };

  }
);