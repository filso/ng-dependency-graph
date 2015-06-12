'use strict';

angular.module('ngDependencyGraph')
  .factory('util', function() {

    var service = {
      extractMasks: function(str) {
        return str.split(';').map(function(s) {
          return new RegExp(s.trim());
        });
      },
      simpleToJSregexp: function(str) {
        // TODO
        return new RegExp();
      }
    };

    return service;

  });