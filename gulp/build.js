'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var fs = require('fs');


var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'csso']
});

module.exports = function(options) {
  var paths = options.paths;

  gulp.task('build', ['html']);

  gulp.task('partials', function() {
    return gulp.src('app/scripts/**/*.html')
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe($.angularTemplatecache('templateCacheHtml.js', {
        module: 'ngDependencyGraph',
        root: 'scripts'
      }))
      .pipe(gulp.dest(paths.dist));
  });

  gulp.task('html', ['partials'], function() {
    var partialsInjectFile = gulp.src(paths.dist + '/templateCacheHtml.js');
    var partialsInjectOptions = {
      starttag: '<!-- inject:partials -->',
      addRootSlash: false
    };

    var websiteInfo = {
      websiteInfo: fs.readFileSync('app/websiteInfo.html', 'utf8'),
    };

    var jsFilter = $.filter('**/*.js', {restore: true});

    return gulp.src('app/index.html')
      .pipe($.inject(partialsInjectFile, partialsInjectOptions))
      .pipe($.htmlReplace(websiteInfo))
      // .pipe($.rev())
      .pipe($.useref())
      .pipe(jsFilter)
      .pipe($.ngAnnotate())
      .pipe($.uglify({
        preserveComments: $.uglifySaveLicense
      })).on('error', options.errorHandler('Uglify'))
      .pipe(jsFilter.restore())
      // .pipe($.replace('/assets/images', '/fr/assets/images'))
      .pipe(gulpif('*.css', $.csso()))
      .pipe(gulp.dest('.'))
      .pipe($.size({
        title: paths.dist + '/',
        showFiles: true
      }));
  });

  gulp.task('copy', [], function() {
    return gulp.src([])
      .pipe(gulp.dest(options.dist + '/'));
  });

  gulp.task('clean', function(done) {
    $.del.sync(['dist/', options.tmp + '/']);
    done();
  });


};
