'use strict';

var gulp = require('gulp');

var karma = require('karma');
var concat = require('concat-stream');
var _ = require('lodash');

module.exports = function(options) {
  function listFiles(callback) {

    var specFiles = [
      'app/**/*.spec.js',
      'app/**/*.mock.js'
    ];

    var htmlFiles = [
      'app/**/*.html'
    ];

    // TODO: move vendor files to gulpfile.js
    var srcFiles = [
      'app/vendor/jquery-2.1.1.min.js',
      'app/vendor/angular.js',
      'app/vendor/angular-animate.js',
      'app/vendor/angular-mocks.js',
      'app/vendor/d3.min.js',
      'app/vendor/lodash.js',

      'app/scripts/app.module.js',
      'app/scripts/**/*.js',
    ].concat(specFiles.map(function(file) {
      return '!' + file;
    }));


    gulp.src(srcFiles)
      .pipe(concat(function(files) {
        callback(_.pluck(files, 'path')
          .concat(htmlFiles)
          .concat(specFiles));
      }));
  }

  function runTests(singleRun, done) {
    listFiles(function(files) {
      karma.server.start({
        configFile: __dirname + '/../karma.conf.js',
        files: files,
        singleRun: singleRun,
        autoWatch: !singleRun
      }, done);
    });
  }

  gulp.task('test', ['scripts'], function(done) {
    runTests(true, done);
  });
  gulp.task('test:auto', ['watch'], function(done) {
    runTests(false, done);
  });
};
