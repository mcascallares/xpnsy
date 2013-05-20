module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // see http://robdodson.me/blog/2012/11/18/a-require-dot-js-multipage-shimmed-site-how-to/
    requirejs: {
      compile: {
        options: {
          baseUrl: 'public/javascripts',
          dir: 'public/javascripts-built',
          mainConfigFile: 'public/javascripts/common.js',
          optimize: 'uglify', // set to 'none' if you want to disable
          modules: [
            {
              name: 'common',
              include: ['jquery',
                        'foundation',
                        'foundation.datepicker'
              ],
              exclude: ['jquery']
            },

            {
              name: 'dashboard',
              exclude: ['common', 'jquery']
            },

            {
              name: 'about',
              exclude: ['common', 'jquery']
            },

            {
              name: 'home',
              exclude: ['common', 'jquery']
            }
          ]
        }
      }
    }
  });
};