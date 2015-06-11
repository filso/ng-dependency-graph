'use strict';

angular.module('ngDependencyGraph')
  .directive('dgInfoPanelList', function($rootScope, $parse, currentView) {


    return {
      restrict: 'A',
      templateUrl: 'scripts/infoPanel/dgInfoPanelList.html',
      replace: true,
      scope: true,
      link: function(scope, elm, attrs) {
        scope.$watch(attrs.dgInfoPanelList, function(newList) {
          scope.list = _.sortBy(newList, 'name');
        });

        scope.title = attrs.title;
      }
    };


  });
