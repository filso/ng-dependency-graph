'use strict';

var gulp = require('gulp');
var conventionalChangelog = require('conventional-changelog');

var fs = require('fs');

module.exports = function(options) {

  gulp.task('changelog', function() {
 
    conventionalChangelog({
      preset: 'angular'
    }).pipe(fs.createWriteStream('CHANGELOG.md'));

  });

};
