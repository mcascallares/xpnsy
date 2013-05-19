define(['jquery',
  'goog!visualization,1,packages:[corechart]',
  'hgn!./templates/chart'],
  function($, googleChart, chartTemplate) {

    var MovementPieChartView = Backbone.View.extend({

      template: chartTemplate,

      initialize: function() {
        this.render();
      },

      render: function() {
        this.$el.html(this.template());
        this.showCurrentMonth();
        return this;
      },

      showCurrentMonth: function() {
        $('.active', this.$el).removeClass('active');
        $('.js-show-current-month', this.$el).addClass('active');
        this.generatePieChart('/movements/totals/expense/month', 'Expenses in this month');
      },

      showCurrentYear: function() {
        $('.active', this.$el).removeClass('active');
        $('.js-show-current-year', this.$el).addClass('active');
        this.generatePieChart('/movements/totals/expense/year', 'Expenses in this year');
      },

      showAll: function() {
        $('.active', this.$el).removeClass('active');
        $('.js-show-all', this.$el).addClass('active');
        this.generatePieChart('/movements/totals/expense/all', 'All my expenses');
      },

      generatePieChart: function(endpoint, title) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Label');
        data.addColumn('number', 'Total amount');

        var options = {
          'title':'Title',
          'width':400,
          'height':300,
          'is3D': true,
          'chartArea': {'top':0, 'width': '100%', 'height': '100%'},
          'legend': {'position': 'left'}
        };

        var self = this;
        $.get(endpoint).done(function(response) {
          response.forEach(function(item) {
            data.addRow([item.label, item.total]);
          });

          var chart = new google.visualization.PieChart($('#chartContainer', this.$el)[0]);
          chart.draw(data, options);
        });
      },

      events: {
        'click .js-show-current-month': 'showCurrentMonth',
        'click .js-show-current-year': 'showCurrentYear',
        'click .js-show-all': 'showAll'
      }

    });

    return {
      MovementPieChartView: MovementPieChartView
    };

  }
);