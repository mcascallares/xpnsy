define(['backbone',
  'backbone.validation'],
  function(Backbone, validation) {

    var Expense = Backbone.Model.extend({

        urlRoot: '/expenses',

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

    var ExpenseCollection = Backbone.Collection.extend({
      model: Expense,
      url: '/expenses'
    });


    return {
      Expense: Expense,
      ExpenseCollection: ExpenseCollection
    };

  }
);