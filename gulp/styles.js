'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

module.exports = function(options) {


  gulp.task('sass', function() {
    return gulp.src('./app/styles/main.scss')
      .pipe(sass({
        outputStyle: "compressed",
        includePaths: ["./app"]
      }))
      .on('error', options.errorHandler('Sass'))
      .pipe(gulp.dest('./app/styles'))
      .pipe(browserSync.reload({ stream: true }));
  });

};
