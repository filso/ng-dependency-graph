'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var appStream = gulp.src([
  './app/scripts/**/*.js',
  '!./app/scripts/**/*.spec.js'
]);

module.exports = function(options) {

  gulp.task('inject', [], function () {
    var injectScripts = appStream
      .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

    var injectOptions = {
      ignorePath: ['.'],
      addRootSlash: true
    };

    return gulp.src('./app/index.html')
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(gulp.dest('./app/'));

  });
};
