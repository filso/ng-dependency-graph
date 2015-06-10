'use strict';

angular.module('ngDependencyGraph')
  .controller('TriggerComponentsCtrl', function($rootScope, currentView, $scope) {

    $scope.change = function() {
      currentView.graph.filter();

    };

  });
