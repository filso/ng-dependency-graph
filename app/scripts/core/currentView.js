'use strict';

/**
 * TODO this is doing too much: extract filters, serialisation
 *
 * Responsibilities:
 * - singleton holding currentView
 * - filtering of modules / components
 */
angular.module('ngDependencyGraph')
  .factory('currentView', function($rootScope, Const, util) {

    var service = {
      selectedNode: undefined,
      scope: Const.Scope.MODULES,
      filters: {
        filterModules: Const.FilterModules.DEFAULT_FILTER,
        ignoreModules: Const.FilterModules.DEFAULT_IGNORE,
        componentsVisible: {
          service: true,
          controller: true
        }
      },
      options: {
        stickyNodesEnabled: false
      },
      setGraphs: function(modulesGraph, componentsGraph) {
        this.modulesGraph = modulesGraph;
        this.componentsGraph = componentsGraph;
      },
      setScope: function(scope) {
        this.scope = scope;
      },
      chooseNode: function(node, translate) {
        if (node.isModule === true && this.scope !== Const.Scope.MODULES) {
          this.setScope(Const.Scope.MODULES);
        } else if (node.isModule === false && this.scope !== Const.Scope.COMPONENTS) {
          this.setScope(Const.Scope.COMPONENTS);
        }
        
        this.selectedNode = node;
        $rootScope.$broadcast(Const.Events.CHOOSE_NODE, node, translate);
      },
      applyFilters: _.throttle(function() {
        service._applyFilters();
      }, 200),
      _applyFilters: function() {
        if (!this.componentsGraph || !this.modulesGraph) {
          return; // not initialised
        }

        this.graph = (this.scope === Const.Scope.COMPONENTS ? this.componentsGraph : this.modulesGraph);

        var masks;
        this.componentsGraph.resetFilter();
        this.modulesGraph.resetFilter();

        if (this.filters.componentsVisible && this.scope === 'components') {
          this.componentsGraph.filterNodes(function(node) {
            var val = service.filters.componentsVisible[node.type];
            return val === true;
          });
        }

        // Apply ignore and filter masks to modules
        if (this.filters.ignoreModules) {
          masks = util.extractMasks(this.filters.ignoreModules);

          masks.forEach(function(mask) {
            service.modulesGraph.filterNodes(function(node) {
              return mask.test(node.name) === false;
            });
          });
        }

        if (this.filters.filterModules) {
          masks = util.extractMasks(this.filters.filterModules);
          
          masks.forEach(function(mask) {
            service.modulesGraph.filterNodes(function(node) {
              return mask.test(node.name);
            });
          });
        }

        // Now filter all components of excluded modules 
        this.componentsGraph.filterNodes(function(node) {
          return (service.modulesGraph.nodes.indexOf(node.module) !== -1);
        });

        $rootScope.$broadcast(Const.Events.UPDATE_GRAPH);
      }
    };

    function updateView(newVal, oldVal) {
      service.applyFilters();
    }

    $rootScope.$watch('currentView.filters', updateView, true);
    $rootScope.$watch('currentView.scope', updateView, true);

    return service;

  });
