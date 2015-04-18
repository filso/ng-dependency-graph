// TODO
// - set up build (dist/)
// - set up deployment
// - add sails-linker (possibly rewrite grunt plugin)

var gulp = require('gulp');
var fs = require('fs');

var concat = require('gulp-concat');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var cache = require('gulp-cached');
var livereload = require('gulp-livereload');
var linker = require('gulp-linker');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var _ = require('lodash-node');

var paths = {
  testScripts: ['app/scripts/**/*.js', '!app/scripts/inject/debug.js', '!app/scripts/**/*_test.js', '!app/scripts/old/**/*.js', '!app/scripts/app.js'],
  scripts: ['app/scripts/**/*.js'],
  scriptsWithoutTests: ['app/scripts/**/*.js', '!app/scripts/**/*_test.js'],
  images: 'app/images/**/*',

  styles: {
    sass: 'app/styles/**/*.scss',
    css: 'app/styles/*.css'
  },
  notLinted: ['!app/scripts/templates.js']
};

require('./gulp-tasks/versioning');
// require('./gulp-tasks/inject');

// Error-handler for gulp-plumber
var onError = function(err) {
  gutil.beep();
  console.log(err);
};


////////////////////////////
/// Development tasks
///
var developTasks = ['preprocess', 'watch'];
gulp.task('develop', developTasks);

gulp.task('no-karma', function() {
  _.remove(developTasks, 'karma');
  gulp.start('develop');
});


gulp.task('preprocess', ['linker', 'sass']);
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['develop']);



gulp.task('lint', function() {
  return gulp.src(paths.scripts.concat(paths.notLinted))
    .pipe(cache('lint'))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, function(file) {
    gulp.src(file.path)
      .pipe(connect.reload(file.path));
  });

  gulp.watch(paths.styles.css, ['reloadStyles']);
  gulp.watch(paths.styles.sass, ['sass']);

  gulp.watch(paths.scriptsWithoutTests, function(event) {
    if (event.type === 'added' || event.type === 'deleted') {
      gulp.start('linker');
    }
  });
});

gulp.task('reloadJs', function() {
  return gulp.src(paths.scripts)
    .pipe(connect.reload());
});

gulp.task('reloadStyles', function() {
  gulp.src(paths.styles.css)
    .pipe(connect.reload());
});

gulp.task('linker', function() {
  return gulp.src('app/index.html')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(linker({
      scripts: paths.testScripts,
      startTag: '<!--SCRIPTS-->',
      endTag: '<!--SCRIPTS END-->',
      fileTmpl: '<script src="%s"></script>',
      appRoot: 'app/'
    }))
    .pipe(gulp.dest('app/'));
});


gulp.task('sass', function() {
  return gulp.src('./app/styles/main.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      outputStyle: "compressed",
      includePaths: ["./app"]
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./app/styles'));
});
