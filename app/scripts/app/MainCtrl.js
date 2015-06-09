'use strict';

angular.module('ngDependencyGraph')
  .controller('MainCtrl', function($scope, dev, Graph, Const, currentView) {

    $scope.currentView = currentView;

    var rawData = rawMockData.ngArchitecture;
    _.each(rawData.modules, function(module) {
        _.each(module.components, function(com) {
            com._module = module;
            module.type = 'module';
        });
    });

    var componentsGraph = new Graph(rawData.modules[0].components);
    var modulesGraph = new Graph(rawData.modules);



    this.chooseScope = function(val) {
      if (val === Const.Scope.MODULES) {
        currentView.updateGraph(val, modulesGraph);
      } else {
        currentView.updateGraph(val, componentsGraph);
      }
    };

    this.chooseScope(Const.Scope.COMPONENTS);


  });
