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
      currentView.setScope(val);
    };

    var self = this;

    var allComponents = [];
    _.each(rawData.modules, function(module) {
      allComponents = allComponents.concat(module.components);
    });

    var componentsGraph = Graph.createFromRawNodes(allComponents, Const.Scope.COMPONENTS);
    var modulesGraph = Graph.createFromRawNodes(rawData.modules, Const.Scope.MODULES);

    /**
     * Connect modules with components
     */
    _.each(componentsGraph.nodes, function(com) {
      var module = _.find(modulesGraph.nodes, {name: com._data._module.name});
      com.module = module;

      module.componentsByType = module.componentsByType || {};
      if (module.componentsByType[com.type] === undefined) {
        module.componentsByType[com.type] = [];
      }
      module.componentsByType[com.type].push(com);

    });


    currentView.setGraphs(modulesGraph, componentsGraph);

    // DEBUG that's for development
    $timeout(function() {
      var node = _.find(componentsGraph.nodes, {name: 'clView'});
      // var node = _.find(modulesGraph.nodes, {name: 'az-ci'});
      currentView.chooseNode(node);
    }, 300);

    // this.chooseScope(Const.Scope.COMPONENTS);


  });
