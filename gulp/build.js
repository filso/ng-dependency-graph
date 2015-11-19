'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {

  gulp.task('partials', function() {
    return gulp.src([
        'app/**/*.html',
        '!app/index.html',
      ], {base: 'app'})
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe($.angularTemplatecache('templateCacheHtml.js', {
        module: 'ngDependencyGraph',
        root: '/'
      }))
      .pipe(gulp.dest(options.assets));
  });

  gulp.task('html', ['inject'], function() {
    var partialsInjectFile = gulp.src(options.assets + '/templateCacheHtml.js', { read: false });
    var partialsInjectOptions = {
      starttag: '<!-- inject:partials -->',
      ignorePath: options.tmp + '/partials',
      addRootSlash: true
    };

    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js', {restore: true});
    var cssFilter = $.filter('**/*.css', {restore: true});
    var assets;

    return gulp.src('app/index.html')
      .pipe($.inject(partialsInjectFile, partialsInjectOptions))
      .pipe(assets = $.useref.assets())
      .pipe($.rev())
      .pipe(jsFilter)
      .pipe($.ngAnnotate())
      .pipe($.uglify({
        preserveComments: $.uglifySaveLicense
      })).on('error', options.errorHandler('Uglify'))
      .pipe(jsFilter.restore())
      .pipe(cssFilter)
      // .pipe($.replace('../../bower_components/bootstrap-sass-official/assets/fonts/bootstrap/', '../fonts/'))
      // .pipe($.replace('/assets/images', '/fr/assets/images'))
      // .pipe($.replace(options.presentation.replace('.', '') + '/styles/fonts/', '/' + options.aws.dir + '/styles/fonts/'))
      .pipe($.csso())
      .pipe(cssFilter.restore())
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.revReplace({
        prefix: options.aws.urlPrefix + options.aws.dir
      }))
      .pipe(htmlFilter)
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true,
        conditionals: true
      }))
      .pipe(htmlFilter.restore())
      .pipe(gulp.dest(options.dist + '/'))
      .pipe($.size({
        title: options.dist + '/',
        showFiles: true
      }));
  });

};
