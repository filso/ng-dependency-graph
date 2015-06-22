'use strict';

angular.module('ngDependencyGraph')
  .controller('TriggerComponentsCtrl', function($scope, currentView, Const) {
  	$scope.change = function() {
  		currentView.scope = Const.Scope.COMPONENTS;
  	};
  });
