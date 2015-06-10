'use strict';

angular.module('ngDependencyGraph')
  .controller('TriggerComponentsCtrl', function($rootScope, $scope, Const, currentView) {


    $scope.componentsVisible = currentView.componentsVisible;

    $scope.change = function() {

      currentView.graph.resetFilter();

      currentView.graph.filterNodes(function(node) {
        var val = $scope.componentsVisible[node.type];
        return val === true;
      });

      $rootScope.$broadcast('updateGraph');
    };

    // TODO this will result in triggering updateGraph twice
    $scope.change();

  });
