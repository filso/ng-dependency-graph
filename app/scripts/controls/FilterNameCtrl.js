angular.module('ngArchitecture')
  .controller('FilterNameCtrl', function($scope, $rootScope) {
    'use strict';

    $scope.name = '';

    $scope.$watch('name', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        // $scope.currentGraph.filterByName(newVal);
        $rootScope.$broadcast('currentGraph:update');

      }
    });

  });
