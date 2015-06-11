'use strict';

angular.module('ngDependencyGraph')
  .factory('Graph', function(nodeFactory) {

    function Graph(nodes, links, scope) {
      this.scope = scope;
      this.origNodes = this.nodes = nodes;
      this.origLinks = this.links = links;
    }

    Graph.createFromRawNodes = function(rawNodes, scope) {

      var nodes = nodeFactory.createNodes(rawNodes);
      var links = [];

      _.each(nodes, function(node1) {

        _.each(node1.deps, function(node2) {
          links.push({target: node1, source: node2, _id: _.uniqueId()});
        });

      });

      return new Graph(nodes, links, scope);
    };

    Graph.prototype.filterNodes = function(fn) {
      var nodes = this.nodes = _.filter(this.nodes, fn);
      this.links = _.filter(this.links, function(l) {
        return nodes.indexOf(l.target) !== -1 && nodes.indexOf(l.source) !== -1;
      });
    };

    Graph.prototype.resetFilter = function() {
      this.nodes = this.origNodes;
      this.links = this.origLinks;
    };

    Graph.prototype.filterByName = function(name) {
      var nameLow = name.toLowerCase();
      this.filterNodes(function(node) {
        return node.name.toLowerCase().indexOf(nameLow) !== -1;
      });

    };

    return Graph;

  });
