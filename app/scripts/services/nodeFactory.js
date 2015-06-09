'use strict';

angular.module('ngDependencyGraph')
  .factory('nodeFactory', function(Node) {

    function createNodes(rawNodes) {
      var nodes = _.map(rawNodes, function(rawNode) {
        return new Node(rawNode);
      });

      _.each(nodes, function(node1) {

        var node1Deps = _.filter(nodes, function(item) {
          return _.contains(node1._data.deps, item._data.name);
        });

        _.each(node1Deps, function(node2) {
          node1.linkDep(node2);
          node2.linkProvides(node1);
        });

      });
      return nodes;
    }

    return {
      createNodes: createNodes
    };
  });
