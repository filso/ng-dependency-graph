'use strict';

angular.module('ngDependencyGraph').factory('Graph', function (nodeFactory) {
  class Graph {
    constructor(nodes, links, scope) {
      this.scope = scope;
      this.origNodes = this.nodes = nodes;
      this.origLinks = this.links = links;
    }

    static createFromRawNodes(rawNodes, scope, oldGraph) {
      const { nodes, links } = nodeFactory.createNodes(rawNodes, oldGraph);
      return new Graph(nodes, links, scope);
    }

    filterNodes(fn) {
      const nodes = (this.nodes = this.nodes.filter(fn));
      this.links = this.links.filter((l) => nodes.includes(l.target) && nodes.includes(l.source));
    }

    resetFilter() {
      this.nodes = this.origNodes;
      this.links = this.origLinks;
    }

    filterByName(name) {
      const nameLow = name.toLowerCase();
      this.filterNodes((node) => node.name.toLowerCase().includes(nameLow));
    }
  }

  return Graph;
});
