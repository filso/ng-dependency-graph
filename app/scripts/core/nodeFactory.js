'use strict';

angular.module('ngDependencyGraph').factory('nodeFactory', function (Component, Module, util) {
  /**
   * Create graph nodes and links from raw metadata, optionally reusing
   * nodes from oldGraph so D3 keeps positions across graph updates
   * (nodes are identified by `_id`).
   */
  function createNodes(rawNodes, oldGraph) {
    const nodes = rawNodes.map((rawNode) => {
      const existing = oldGraph && oldGraph.nodes.find((n) => n.name === rawNode.name);
      if (existing) {
        return existing;
      }
      return rawNode.type === 'module' ? new Module(rawNode) : new Component(rawNode);
    });

    nodes.forEach((node) => node.resetLinks());

    const links = [];
    nodes.forEach((node) => {
      const nodeDeps = nodes.filter((item) => node._data.deps && node._data.deps.includes(item._data.name));

      nodeDeps.forEach((dep) => {
        node.linkDep(dep);
        dep.linkProvides(node);
        links.push({ target: node, source: dep, _id: util.uniqueId() });
      });
    });

    return { nodes, links };
  }

  return { createNodes };
});
