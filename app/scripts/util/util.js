'use strict';

angular.module('ngDependencyGraph')
  .factory('util', function() {

    var util = {
      extractMasks: function(str) {
        return str.split(',').map(function(s) {
          return util.simpleToJSregexp(s.trim());
        });
      },
      simpleToJSregexp: function(str) {
        var newStr = str.replace(/[*]/g, '.*');
        return new RegExp('^' + newStr + '$');
      }
    };

    return util;

  });