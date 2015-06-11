'use strict';

angular.module('ngDependencyGraph')
  .controller('TriggerComponentsCtrl', function($rootScope, $scope, Const, currentView) {

    $scope.componentsVisible = currentView.componentsVisible;

    $scope.change = function() {
      currentView.setComponentsVisible($scope.componentsVisible);
    };

  });
