'use strict';

angular.module('ngDependencyGraph')
  .controller('MainCtrl', function($scope, $timeout, dev, Graph, Const, currentView, appDeps) {
    var self = this;
    $scope.currentView = currentView;

    var rawData;

    appDeps.loadFromInspectedWindow(function(deps) {
      if (deps) {
        rawData = deps;
      } else {
        rawData = sampleAppData.ngArchitecture;
      }
      init();
    });


    self.chooseScope = function(val) {
      currentView.setScope(val);
    };

    function init() {

      _.each(rawData.modules, function(module) {
          module.type = 'module';
        
          _.each(module.components, function(com) {
              com._module = module;
          });
      });

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
        // var node = _.find(componentsGraph.nodes, {name: 'clView'});
        // var node = _.find(modulesGraph.nodes, {name: 'az-ci'});
        var node = _.find(modulesGraph.nodes, {name: rawData.apps[0]});
        
        if (node) {
          currentView.chooseNode(node);
        } else {
          currentView.setScope(Const.Scope.COMPONENTS);
        }
      }, 300);

    }


  });
