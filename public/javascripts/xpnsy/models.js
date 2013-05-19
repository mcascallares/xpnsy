define(['backbone',
  'backbone.validation'],
  function(Backbone, validation) {

    var Movement = Backbone.Model.extend({

        urlRoot: '/movements',

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

    var MovementCollection = Backbone.Collection.extend({
      model: Movement,

      url: '/movements',

      comparator: function(movement) {
        return -movement.get('whenMs');
      }
    });


    return {
      Movement: Movement,
      MovementCollection: MovementCollection
    };

  }
);