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

    var self = this;

    var allComponents = [];
    _.each(rawData.modules, function(module) {
      allComponents = allComponents.concat(module.components);
    });

    var modulesGraph = Graph.createFromRawNodes(rawData.modules, Const.Scope.MODULES);
    var componentsGraph = Graph.createFromRawNodes(allComponents, Const.Scope.COMPONENTS);

    console.log(modulesGraph.links.length);

    // DEBUG that's for development
    $timeout(function() {

      // var node = _.find(componentsGraph.nodes, {name: 'clView'});
      // currentView.chooseNode(node);
    }, 300);

    this.chooseScope = function(val) {
      if (val === Const.Scope.MODULES) {
        currentView.updateGraph(modulesGraph);

      } else {
        currentView.updateGraph(componentsGraph);
      }
    };

    this.chooseScope(Const.Scope.COMPONENTS);

  });
