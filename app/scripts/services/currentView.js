'use strict';

angular.module('ngDependencyGraph')
  .factory('currentView', function($rootScope) {

    return {
      updateGraph: function(scope, graph) {
        this.graph = graph;
        this.scope = scope;
        $rootScope.$broadcast('updateGraph');
      },
      chooseNode: function(node) {
        this.selectedNode = node;
        $rootScope.$broadcast('chooseNode', node);
      },
      componentsVisible: {
        service: true,
        controller: true
      },
      selectedNode: undefined
    };

  });
