'use strict';

/**
 * Singleton holding the current view state:
 * selected node, modules/components scope, filters and options.
 */
angular.module('ngDependencyGraph').factory('currentView', function ($rootScope, Const, util) {
  const service = {
    selectedNode: undefined,
    scope: Const.Scope.MODULES,
    filters: {
      filterModules: Const.FilterModules.DEFAULT_FILTER,
      ignoreModules: Const.FilterModules.DEFAULT_IGNORE,
      componentsVisible: {
        service: true,
        controller: true,
      },
    },
    options: {
      stickyNodesEnabled: false,
    },

    setGraphs(modulesGraph, componentsGraph) {
      this.modulesGraph = modulesGraph;
      this.componentsGraph = componentsGraph;
    },

    setScope(scope) {
      this.scope = scope;
    },

    chooseNode(node, translate) {
      this.setScope(node.isModule === true ? Const.Scope.MODULES : Const.Scope.COMPONENTS);
      this.selectedNode = node;
      $rootScope.$broadcast(Const.Events.CHOOSE_NODE, node, translate);
    },

    _applyFilters() {
      if (!this.componentsGraph || !this.modulesGraph) {
        return; // not initialised
      }

      this.graph = this.scope === Const.Scope.COMPONENTS ? this.componentsGraph : this.modulesGraph;

      this.componentsGraph.resetFilter();
      this.modulesGraph.resetFilter();

      if (this.filters.componentsVisible && this.scope === Const.Scope.COMPONENTS) {
        this.componentsGraph.filterNodes((node) => service.filters.componentsVisible[node.type] === true);
      }

      // Apply ignore and filter masks to modules
      if (this.filters.ignoreModules) {
        util.extractMasks(this.filters.ignoreModules).forEach((mask) => {
          service.modulesGraph.filterNodes((node) => mask.test(node.name) === false);
        });
      }

      if (this.filters.filterModules) {
        util.extractMasks(this.filters.filterModules).forEach((mask) => {
          service.modulesGraph.filterNodes((node) => mask.test(node.name));
        });
      }

      // Hide components whose module has been filtered out
      this.componentsGraph.filterNodes((node) => service.modulesGraph.nodes.includes(node.module));

      $rootScope.$broadcast(Const.Events.UPDATE_GRAPH);
    },
  };

  service.applyFilters = util.throttle(function () {
    service._applyFilters();
  }, 200);

  function updateView() {
    service.applyFilters();
  }

  $rootScope.$watch('currentView.filters', updateView, true);
  $rootScope.$watch('currentView.scope', updateView, true);

  return service;
});
