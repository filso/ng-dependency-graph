var gulp = require('gulp');
var conventionalChangelog = require('conventional-changelog');
var runSequence = require('run-sequence');
var bump = require('gulp-bump');
var gulpExec = require('gulp-exec');
var fs = require('fs');


/**
 * Version release code
 */
gulp.task('release', function(callback) {
  runSequence('bump-minor', 'release-tasks', callback);
});

gulp.task('patch', function(callback) {
  runSequence('bump-patch', 'release-tasks', callback);
});

gulp.task('bump-minor', function() {
  gulp.src('./package.json')
    .pipe(bump({
      type: 'minor'
    }))
    .pipe(gulp.dest('./'));
});


gulp.task('bump-patch', function() {
  gulp.src('./package.json')
    .pipe(bump({
      type: 'patch'
    }))
    .pipe(gulp.dest('./'));
});

// https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.we1fxubeuwef
gulp.task('release-tasks', function() {
  var jsonFile = require('./package.json'),
    commitMsg = "chore(release): " + jsonFile.version;

  function changeParsed(err, log) {
    if (err) {
      return done(err);
    }
    fs.writeFile('CHANGELOG.md', log);
  }
  var repository, version;
  repository = jsonFile.repository, version = jsonFile.version;
  conventionalChangelog({
    // repository: repository.url,
    version: version
  }, changeParsed);

  return gulp.src(['package.json', 'CHANGELOG.md'])
    .pipe(gulp.dest('.'))
    .pipe(gulpExec('git add -A')) // so the following git commands only execute once
    .pipe(gulpExec("git commit -m '" + commitMsg + "'"))
    .pipe(gulpExec("git tag -a " + jsonFile.version + " -m '" + commitMsg + "'"));
});