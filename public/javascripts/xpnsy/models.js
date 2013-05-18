define(['backbone',
  'backbone.validation'],
  function(Backbone, validation) {

    var Expense = Backbone.Model.extend({

        urlRoot: '/expenses',

        defaults: {
          type: 'expense',
          label: null,
          amount: null,
          when: new Date()
        },

        validation: {
          type: {
            required: true,
            oneOf: ['expense', 'income']
          },
          label: {
            required: true
          },
          amount: {
            required: true
          },
          when: {
            required: true
          }
        }
    });

    var ExpenseCollection = Backbone.Collection.extend({
      model: Expense,

      url: '/expenses',

      comparator: function(expense) {
        return -expense.get('whenMs');
      }
    });


    return {
      Expense: Expense,
      ExpenseCollection: ExpenseCollection
    };

  }
);