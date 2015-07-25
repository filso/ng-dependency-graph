'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();



module.exports = function(options) {

  var appStream = gulp.src(options.paths.appScripts);

  gulp.task('inject', [], function () {
    var injectScripts = appStream
      .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

    var injectOptions = {
      ignorePath: ['.'],
      addRootSlash: false,
      relative: true
    };

    return gulp.src('./app/index.html')
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(gulp.dest('./app/'));

  });
};
