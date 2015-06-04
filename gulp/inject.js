'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var appStream = gulp.src([
  './app/scripts/**/*.js',
  '!./app/scripts/**/*.spec.js'
]);


module.exports = function(options) {

  gulp.task('inject', [], function () {
    var injectStyles = gulp.src([
      options.tmp + '/serve/app/**/*.css',
      '!' + options.tmp + '/serve/app/vendor.css'
    ], { read: false });

    var injectScripts = appStream
      .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

    var injectOptions = {
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: true
    };

    return gulp.src(options.src + '/app/index.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(gulp.dest(options.src + '/app/'));

  });
};
