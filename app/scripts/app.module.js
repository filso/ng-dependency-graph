angular.module('ngDependencyGraph', ['ngDependencyGraph.infoPanel'])
  .run(function($rootScope, dev, currentView) {
    dev.exposeGlobalObject();
    $rootScope.currentView = currentView;
  });