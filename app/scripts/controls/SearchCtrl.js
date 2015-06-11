'use strict';

angular.module('ngDependencyGraph')
  .controller('SearchCtrl', function($scope, $rootScope) {

    $scope.name = '';

    $scope.$watch('name', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        $rootScope.$broadcast('currentGraph:update');

      }
    });

  });
