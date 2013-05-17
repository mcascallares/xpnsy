module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    requirejs: {
      compile: {
        options: {
          mainConfigFile: 'public/javascripts/app.js',
          baseUrl: 'public/javascripts',
          name: 'app',
          include: ['app'],
          out: 'public/javascripts/app.min.js'
        }
      }
    }

  });


};