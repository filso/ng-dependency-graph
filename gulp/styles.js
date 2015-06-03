'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var gutil = require('gutil');
var plumber = require('plumber');


module.exports = function(options) {


  gulp.task('sass', function() {
    return gulp.src('./app/styles/main.scss')
      .pipe(plumber({
        errorHandler: options.errorHandler('Sass')
      }))
      .pipe(sass({
        outputStyle: "compressed",
        includePaths: ["./app"]
      }))
      .on('error', gutil.log)
      .pipe(gulp.dest('./app/styles'))
      .pipe(browserSync.reload({ stream: true }));
  });

};
