angular.module('ngArchitecture')
  .factory('Graph', function(componentFactory) {
    'use strict';

    function Graph(rawNodes) {

      var nodes = componentFactory.createComponents(rawNodes);

      var links = [];

      _.each(nodes, function(node1) {

        _.each(node1.deps, function(node2) {
          links.push({source: node1, target: node2});
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
