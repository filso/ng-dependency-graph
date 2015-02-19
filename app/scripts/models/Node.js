angular.module('app')
  .factory('Node', function() {
    function Node() {
      this.nodble = 'asd';
    }

    Node.prototype.getClass = function() {
      return 'node';
    };

    return Node;
  });
