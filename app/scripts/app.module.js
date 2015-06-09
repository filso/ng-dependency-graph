angular.module('ngDependencyGraph', ['ngDependencyGraph.infoPanel'])
  .run(function(dev) {
    dev.exposeGlobalObject();
  });