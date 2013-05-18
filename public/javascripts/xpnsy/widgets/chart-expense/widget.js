define(['jquery',
  'goog!visualization,1,packages:[corechart]',
  'hgn!./templates/chart'],
  function($, googleChart, chartTemplate) {

    var ExpensePieChartView = Backbone.View.extend({

      template: chartTemplate,

      chartOptions: {
        'title':'Expenses',
        'width':400,
        'height':300,
        'is3D': true,
        'chartArea': {'top':0, 'width': '100%', 'height': '100%'},
        'legend': {'position': 'left'}
      },

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

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Label');
        data.addColumn('number', 'Total amount');
        data.addRows([
          ['Travelling', 350],
          ['Supermarket', 200],
          ['Sport', 50],
          ['Transport', 75]
        ]);

        this.drawChart(data, this.chartOptions);
      },


      showCurrentYear: function() {
        $('.active', this.$el).removeClass('active');
        $('.js-show-current-year', this.$el).addClass('active');

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Label');
        data.addColumn('number', 'Total amount');
        data.addRows([
          ['Travelling', 280],
          ['Supermarket', 250],
          ['Sport', 100],
          ['Transport', 20]
        ]);

        this.drawChart(data, this.chartOptions);
      },

      showAll: function() {
        $('.active', this.$el).removeClass('active');
        $('.js-show-all', this.$el).addClass('active');

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Label');
        data.addColumn('number', 'Total amount');
        data.addRows([
          ['Travelling', 100],
          ['Supermarket', 200],
          ['Sport', 50],
          ['Transport', 50]
        ]);

        this.drawChart(data, this.chartOptions);
      },

      drawChart: function(data, options) {
        var chart = new google.visualization.PieChart($('#chartContainer', this.$el)[0]);
        chart.draw(data, options);
      },

      events: {
        'click .js-show-current-month': 'showCurrentMonth',
        'click .js-show-current-year': 'showCurrentYear',
        'click .js-show-all': 'showAll'
      }

    });

    return {
      ExpensePieChartView: ExpensePieChartView
    };

  }
);