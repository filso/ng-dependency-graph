'use strict';

angular.module('ngDependencyGraph')
  .directive('dgInfoPanelList', function($rootScope, $timeout, appDeps, dev, Component, Const, currentView) {

    return {
      restrict: 'A',
      templateUrl: 'scripts/infoPanel/dgInfoPanelList.html',
      replace: true,
      link: function(scope, elm, attrs) {
        console.log('ha!');
      }
    };


  });
