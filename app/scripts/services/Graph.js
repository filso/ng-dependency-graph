'use strict';

angular.module('ngDependencyGraph')
  .factory('Graph', function(nodeFactory) {

    function Graph(rawNodes) {

      var nodes = nodeFactory.createNodes(rawNodes);

      var links = [];

      _.each(nodes, function(node1) {

        _.each(node1.deps, function(node2) {
          links.push({target: node1, source: node2, _id: _.uniqueId()});
        });

      });

      this.links = links;
      this.nodes = nodes;
    }

    Graph.prototype.filterByName = function(name) {
      var nameLow = name.toLowerCase();
      _.filter(this.nodes, function(node) {
        return node.name.toLowerCase().indexOf(nameLow) !== -1;
      });
    };

    return Graph;

  });
