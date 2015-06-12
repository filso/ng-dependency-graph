'use strict';

angular.module('ngDependencyGraph')
  .factory('currentView', function($rootScope, Const, util) {

    var service = {
      selectedNode: undefined,
      filters: {
        filterModules: Const.FilterModules.DEFAULT_FILTER,
        ignoreModules: Const.FilterModules.DEFAULT_IGNORE
      },
      componentsVisible: {
        service: true,
        controller: true
      },
      setGraphs: function(modulesGraph, componentsGraph) {
        this.modulesGraph = modulesGraph;
        this.componentsGraph = componentsGraph;
      },
      setScope: function(scope) {
        this.scope = scope;
        this.graph = (scope === Const.Scope.COMPONENTS ? this.componentsGraph : this.modulesGraph);

        if (scope === 'components') {
          this.setComponentsVisible(this.componentsVisible);
        }

        $rootScope.$broadcast(Const.Events.UPDATE_GRAPH);
      },
      chooseNode: function(node) {
        if (node.isModule === true && this.scope !== Const.Scope.MODULES) {
          this.setScope(Const.Scope.MODULES);
        } else if (node.isModule === false && this.scope !== Const.Scope.COMPONENTS) {
          this.setScope(Const.Scope.COMPONENTS);
        }
        
        this.selectedNode = node;
        $rootScope.$broadcast(Const.Events.CHOOSE_NODE, node);
      },
      applyFilters: function() {
        var masks;
        this.componentsGraph.resetFilter();

        if (this.filters.componentsVisible) {
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
              return mask.test(node.name);
            });
          });
        }

        if (this.filters.filterModules) {
          masks = util.extractMasks(this.filters.ignoreModules);
          
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
      },
      setIgnoreModules: function(ignoreModules, filterModules) {
        this.filters.ignoreModules = ignoreModules;
        this.filters.filterModules = filterModules;
        this.applyFilters();
      },
      setComponentsVisible: function(componentsVisible) {
        this.filters.componentsVisible = componentsVisible;
        this.applyFilters();
      },

      saveState: function() {
        throw 'not implemented';
      },
      loadState: function() {
        throw 'not implemented';
      }
    };

    return service;

  });
