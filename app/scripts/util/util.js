'use strict';

angular.module('ngDependencyGraph')
  .factory('util', function() {

    var util = {
      extractMasks: function(str) {
        return str.split(',').map(function(s) {
          return util.wildcardToRegexp(s.trim());
        });
      },
      wildcardToRegexp: function(str) {
        var newStr = str.replace(/[*]/g, '.*');
        return new RegExp('^' + newStr + '$');
      }
    };

    return util;

  });