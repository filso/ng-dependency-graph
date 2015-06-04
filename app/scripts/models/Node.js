'use strict';

angular.module('ngDependencyGraph')
  .factory('Node', function() {

    function Node() {}

    Object.defineProperty('cssClass', {
      get: function() {
        return 'FIX THIS';
      }
    });

    return Node;
  });
