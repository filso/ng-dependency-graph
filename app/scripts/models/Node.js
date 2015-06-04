'use strict';

angular.module('ngDependencyGraph')
  .factory('Node', function() {

    function Node() {}

    Object.defineProperty(Node.prototype, 'cssClass', {
      get: function() {
        return 'FIX THIS';
      }
    });

    return Node;
  });
