'use strict';

angular.module('ngDependencyGraph')
  .controller('MainCtrl', function($scope, $timeout, dev, Graph, Const, currentView) {

    $scope.currentView = currentView;

    var rawData = sampleAppData.ngArchitecture;
    _.each(rawData.modules, function(module) {
        module.type = 'module';
      
        _.each(module.components, function(com) {
            com._module = module;
        });
    });

    // TODO handle angular not found / wrong version
    if (angular.version) {
    }



    var componentsGraph = Graph.createFromRawNodes(rawData.modules[0].components);
    var modulesGraph = Graph.createFromRawNodes(rawData.modules);


    // DEBUG that's for development
    $timeout(function() {
      var node = _.find(componentsGraph.nodes, {name: 'clView'});
      currentView.chooseNode(node);
    }, 300);

    this.chooseScope = function(val) {
      if (val === Const.Scope.MODULES) {
        currentView.updateGraph(val, modulesGraph);
      } else {
        currentView.updateGraph(val, componentsGraph);
      }
    };

    this.chooseScope(Const.Scope.COMPONENTS);


  });
