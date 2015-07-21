'use strict';

angular.module('ngDependencyGraph')
  .factory('nodeFactory', function(Component, Module) {

    /**
     * Create, optionally reusing nodes from oldGraph
     * Algorithm to update nodes and links is the same:
     * - check if oldGraph contains node / link
     * - if it does, reuse, otherwise create new one
     * - drop otherwise
     * D3 identifies nodes / links by `_id` field;
     * TODO(filip): make sure that memory for old, unused nodes + links doesn't leak
     */
    function createNodes(rawNodes, oldGraph) {
      var nodes = [];
      var links = [];

      _.each(rawNodes, function(rawNode) {
        var node;
        if (oldGraph) {
          node = _.find(oldGraph.nodes, {name: rawNode.name});
        }

        if (_.isUndefined(node)) {
          if (rawNode.type === 'module') {
            node = new Module(rawNode);
          } else {
            node = new Component(rawNode);
          }
        }
        nodes.push(node);
      });

      // TODO(filip): Not reusing links at this time... Do I need to do that? D3 force layout doesn't seem to care
      _.each(nodes, function(node) {
        node.resetLinks();
      });

      _.each(nodes, function(node1) {

        var node1Deps = _.filter(nodes, function(item) {
          return _.contains(node1._data.deps, item._data.name);
        });

        _.each(node1Deps, function(node2) {
          node1.linkDep(node2);
          node2.linkProvides(node1);
          links.push({target: node1, source: node2, _id: _.uniqueId()});
        });

      });

      return {
        nodes: nodes,
        links: links
      };
    }

    return {
      createNodes: createNodes
    };
  });
