'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

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

    var srcFiles = [
      'app/**/*.js'
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

  function runTests (singleRun, done) {
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
