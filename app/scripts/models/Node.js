'use strict';

angular.module('ngDependencyGraph')
  .factory('Node', function() {
    function Node() {}

    Node.prototype.cssClass = 'FIX THIS';

    return Node;
  });
