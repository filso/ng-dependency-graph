'use strict';

angular.module('ngDependencyGraph').directive('dgInfoPanelList', function () {
  return {
    restrict: 'A',
    templateUrl: 'scripts/infoPanel/dgInfoPanelList.html',
    replace: true,
    scope: true,
    link(scope, elm, attrs) {
      scope.$watch(attrs.dgInfoPanelList, function (newList) {
        scope.list = (newList || []).slice().sort((a, b) => a.name.localeCompare(b.name));
      });

      scope.title = attrs.title;
    },
  };
});
