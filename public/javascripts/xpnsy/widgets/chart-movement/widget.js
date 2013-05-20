define(['jquery',
  'goog!visualization,1,packages:[corechart]',
  'hgn!./templates/chart',
  'hgn!./templates/movements',
  ],
  function($, googleChart, chartTemplate, movementsChartTemplate) {

    var ChartView = Backbone.View.extend({

      template: chartTemplate,

      initialize: function() {
        this.render();

        this.expensesView = new MovementsChartView({
          el: $('#expenses-chart', this.$el),
          collection: this.collection,
          charts: {
            showCurrentMonth: {
              endpoint: '/movements/totals/expense/month',
              title: 'Expenses in this month'
            },
            showCurrentYear: {
              endpoint: '/movements/totals/expense/year',
              title: 'Expenses in this year'
            },
            showAll: {
              endpoint: '/movements/totals/expense/all',
              title: 'All my expenses'
            }
          }
        });

        this.incomesView = new MovementsChartView({
          el: $('#incomes-chart', this.$el),
          collection: this.collection,
          charts: {
            showCurrentMonth: {
              endpoint: '/movements/totals/income/month',
              title: 'Incomes in this month'
            },
            showCurrentYear: {
              endpoint: '/movements/totals/income/year',
              title: 'Incomes in this year'
            },
            showAll: {
              endpoint: '/movements/totals/income/all',
              title: 'All my incomes'
            }
          }
        });

        this.showExpenses();
      },

      render: function() {
        this.$el.html(this.template());
        $(document).foundation(); // required to use foundation sections after dom injection
        return this;
      },

      events: {
        'click .js-show-expenses': 'showExpenses',
        'click .js-show-incomes': 'showIncomes'
      },

      showExpenses: function() {
        this.expensesView.render();
      },

      showIncomes: function() {
        this.incomesView.render();
      },

    });


    var MovementsChartView = Backbone.View.extend({

      template: movementsChartTemplate,

      initialize: function() {
        _.bindAll(this);
        this.collection.bind('add', this.render);
        this.collection.bind('remove', this.render);
      },

      render: function() {
        this.$el.html(this.template());
        this.showCurrentMonth();
        return this;
      },

      showCurrentMonth: function() {
        $('.js-show-all', this.$el).removeClass('active');
        $('.js-show-current-year', this.$el).removeClass('active');
        $('.js-show-current-month', this.$el).addClass('active');
        var options = this.options.charts.showCurrentMonth;
        this.generatePieChart(options.endpoint, options.title);
      },

      showCurrentYear: function() {
        $('.js-show-current-month', this.$el).removeClass('active');
        $('.js-show-all', this.$el).removeClass('active');
        $('.js-show-current-year', this.$el).addClass('active');
        var options = this.charts.showCurrentYear;
        this.generatePieChart(options.endpoint, options.title);
      },

      showAll: function() {
        $('.js-show-current-year', this.$el).removeClass('active');
        $('.js-show-current-month', this.$el).removeClass('active');
        $('.js-show-all', this.$el).addClass('active');
        var options = this.charts.showCurrentAll;
        this.generatePieChart(options.endpoint, options.title);
      },

      generatePieChart: function(endpoint, title) {
        console.log('Generating chart');
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Label');
        data.addColumn('number', 'Total');

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
          var chart = new google.visualization.PieChart($('.js-chart-container', self.$el)[0]);
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
      ChartView: ChartView
    };

  }
);