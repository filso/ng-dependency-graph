'use strict';

angular.module('ngDependencyGraph', []).run(function ($rootScope, currentView) {
  $rootScope.currentView = currentView;
});
