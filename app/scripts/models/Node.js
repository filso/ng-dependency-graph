angular.module('app')
  .factory('Node', function() {
    function Node() {}

    Node.prototype.cssClass = 'FIX THIS';

    return Node;
  });
