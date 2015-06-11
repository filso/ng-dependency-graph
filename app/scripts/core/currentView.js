'use strict';

angular.module('ngDependencyGraph')
  .factory('currentView', function($rootScope, Const) {

    return {
      updateGraph: function(graph) {
        this.graph = graph;

        if (graph.scope === 'components') {
          this.setComponentsVisible(this.componentsVisible);
        }

        $rootScope.$broadcast(Const.Events.UPDATE_GRAPH);
      },
      chooseNode: function(node) {
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
