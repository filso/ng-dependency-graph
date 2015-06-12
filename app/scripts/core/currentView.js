'use strict';

angular.module('ngDependencyGraph')
  .factory('currentView', function($rootScope, Const) {

    return {
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
      componentsVisible: {
        service: true,
        controller: true
      },
      setComponentsVisible: function(componentsVisible) {
        
        this.graph.resetFilter();
        this.graph.filterNodes(function(node) {
          var val = componentsVisible[node.type];
          return val === true;
        });

        $rootScope.$broadcast(Const.Events.UPDATE_GRAPH);

      },
      selectedNode: undefined
    };

  });
