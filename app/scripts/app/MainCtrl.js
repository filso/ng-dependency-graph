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

    this.chooseScope = function(val) {
      if (val === Const.Scope.MODULES) {
        currentView.updateGraph(modulesGraph);

      } else {
        currentView.updateGraph(componentsGraph);
      }
    };

    var self = this;

    var allComponents = [];
    _.each(rawData.modules, function(module) {
      allComponents = allComponents.concat(module.components);
    });

    var modulesGraph = Graph.createFromRawNodes(rawData.modules, Const.Scope.MODULES);
    var componentsGraph = Graph.createFromRawNodes(allComponents, Const.Scope.COMPONENTS);

    // DEBUG that's for development
    $timeout(function() {
      // var node = _.find(currentView.graph.nodes, {name: 'clView'});
      var node = _.find(currentView.graph.nodes, {name: 'az-ci'});
      currentView.chooseNode(node);
      console.log(node);
    }, 300);

    this.chooseScope(Const.Scope.MODULES);


  });
