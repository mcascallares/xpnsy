module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    requirejs: {
      compile: {
        options: {
          baseUrl: 'public/javascripts',
          dir: 'public/javascripts-built',
          mainConfigFile: 'public/javascripts/main.js',
          optimize: 'uglify', // set to 'none' if you want to disable
          stubModules : ['text', 'hgn'],
          modules: [
              { name: 'main' },
              { name: 'dashboard' }
          ]
        }
      }
    }
  });
};