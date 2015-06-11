'use strict';

angular.module('ngDependencyGraph')
  .directive('dgInfoPanelList', function($rootScope, $parse, currentView) {

    function chooseNode(node) {
      currentView.chooseNode(node);
    }

    return {
      restrict: 'A',
      templateUrl: 'scripts/infoPanel/dgInfoPanelList.html',
      replace: true,
      scope: true,
      link: function(scope, elm, attrs) {
        scope.list = $parse(attrs.dgInfoPanelList)(scope);
        scope.title = attrs.title;
        scope.chooseNode = chooseNode;
      }
    };


  });
