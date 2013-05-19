define(['backbone',
  'xpnsy/template.helper',
  'hgn!./templates/list',
  'hgn!./templates/list-item'],
  function(Backbone, templateHelper, listTemplate, itemTemplate) {

    var MovementView = Backbone.View.extend({

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


    var ListMovementView = Backbone.View.extend({

      template: listTemplate,

      initialize: function() {
        // bind the functions 'add' and 'remove' to the view.
        //_(this).bindAll('add', 'remove', 'render');
        _.bindAll(this);

        this.collection.bind('add', this.render);
        this.collection.bind('remove', this.render);
        this.render();
      },

      render: function() {
        this.$el.html($(this.template()));
        this.collection.each(function(movement) {
          var movementView = new MovementView({
            el: $('.js-items', this.$el),
            model: movement
          });
        });

        return this;
      }

    });


    return {
      ListMovementView: ListMovementView
    };

  }
);