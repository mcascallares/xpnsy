define(['jquery',
  'backbone',
  'backbone.validation',
  'xpnsy/models',
  'xpnsy/template.helper',
  'hgn!./templates/create-dialog'],
  function($, Backbone, validation, models, templateHelper, dialogTemplate) {

    var CreateMovementView = Backbone.View.extend({

      id: null,
      template: dialogTemplate,

      initialize: function() {
        this.model = new models.Movement();
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
          $.fn.foundation();
          $('.js-datepicker').fdatepicker('setValue', new Date());
        });
        return this;
      },

      events: {
        'click .js-submit': 'submit',
        'change select[name="label"]': 'labelChanged'
      },

      labelChanged: function() {
        var selectElement = $('select[name="label"]', this.$el);
        var value = selectElement.val();
        if (value == 'new') {
          var name = prompt("Please enter label name");
          if (name === null || name === '') {
            selectElement.val('');
            return;
          }

          $.post('/labels', {name: name}).done(function(response) {
            console.log(response);
            var option = new Option(response.name, response._id);
            selectElement.append(option);
            selectElement.val(response._id);
          });

        }
      },

      submit: function() {
        var movement = {
          type: $('input[name="type"]:checked', this.$el).val(),
          label: $('select[name="label"]', this.$el).val(),
          when: $('input[name="when"]', this.$el).val(),
          amount: $('input[name="amount"]', this.$el).val()
        };
        this.model.set(movement);
        var self = this;
        this.model.save(null, {
          success: function(movement) {
            self.collection.add(movement);
            // re-start the model for a new movement
            self.initialize();
          }
        });
      }

    });


    return {
      CreateMovementView: CreateMovementView
    };

  }
);