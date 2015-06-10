'use strict';

angular.module('ngDependencyGraph')
  .controller('MainCtrl', function($scope, dev, Graph, Const, currentView) {

    $scope.currentView = currentView;

    var rawData = rawMockData.ngArchitecture;
    _.each(rawData.modules, function(module) {
        module.type = 'module';
      
        _.each(module.components, function(com) {
            com._module = module;
        });
    });



    var componentsGraph = Graph.createFromRawNodes(rawData.modules[0].components);
    var modulesGraph = Graph.createFromRawNodes(rawData.modules);

    this.chooseScope = function(val) {
      if (val === Const.Scope.MODULES) {
        console.log('HAHA!');
        currentView.updateGraph(val, modulesGraph);
      } else {
        currentView.updateGraph(val, componentsGraph);
      }
    };

    this.chooseScope(Const.Scope.COMPONENTS);


  });
