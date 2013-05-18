define(['jquery',
  'goog!visualization,1,packages:[corechart]',
  'hgn!./templates/chart'],
  function($, googleChart, chartTemplate) {

    var ExpensePieChartView = Backbone.View.extend({

      template: chartTemplate,

      initialize: function() {
        this.render();
      },

      render: function() {
        // draw the widget skeleton
        this.$el.html(this.template());
        this.showLastMonthPie();
        return this;
      },

      showLastMonthPie: function() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Label');
        data.addColumn('number', 'Total amount');
        data.addRows([
          ['Travelling', 350],
          ['Supermarket', 200],
          ['Sport', 50],
          ['Transport', 75]
        ]);

        var options = {
          'title':'Expenses',
          'width':400,
          'height':400
        };

        this.drawChart(data, options);
      },


      drawChart: function(data, options) {
        var chart = new google.visualization.PieChart($('#chartContainer', this.$el)[0]);
        chart.draw(data, options);
      },

      events: {
        //'click .js-submit': 'submit'
      }

    });

    return {
      ExpensePieChartView: ExpensePieChartView
    };

  }
);