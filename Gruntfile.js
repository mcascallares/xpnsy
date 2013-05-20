module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    requirejs: {
      compile: {
        options: {
          baseUrl: 'public/javascripts',
          dir: 'public/javascripts-built',
          mainConfigFile: 'public/javascripts/requirejs-config.js',
          optimize: 'uglify', // set to 'none' if you want to disable
          //stubModules : ['text', 'hgn'],
          modules: [
          {
            //module names are relative to baseUrl
            name: 'requirejs-config',
            //List common dependencies here. Only need to list
            //top level dependencies, "include" will find
            //nested dependencies.
            include: ['jquery',
                      'foundation',
                      'foundation.datepicker'
            ]
          },

          {
            name: 'home',
            exclude: ['requirejs-config']
          },
          {
            name: 'dashboard',
            exclude: ['requirejs-config']
          },
          {
            name: 'about',
            exclude: ['requirejs-config']
          }
          ]
        }
      }
    }
  });
};