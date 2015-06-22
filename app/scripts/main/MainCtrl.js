'use strict';

angular.module('ngDependencyGraph')
  .controller('MainCtrl', function($scope, $timeout, dev, Graph, Const, currentView, inspectedApp, storage) {
    var ctrl = this;
    var lastAppKey;
    var componentsGraph;
    var modulesGraph;
    
    $scope.currentView = currentView;

    function init(isTheSameApp) {
      lastAppKey = inspectedApp.getKey();
      var rawData = inspectedApp.getData();

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

      // Note: if it's the same app, then just update old graph
      componentsGraph = Graph.createFromRawNodes(allComponents, Const.Scope.COMPONENTS, isTheSameApp ? componentsGraph : undefined);
      modulesGraph = Graph.createFromRawNodes(rawData.modules, Const.Scope.MODULES, isTheSameApp ? modulesGraph : undefined);

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

      var appNode = _.find(modulesGraph.nodes, {name: rawData.apps[0]});

      if (isTheSameApp === false) {
        storage.loadCurrentView().then(function() {
          currentView.chooseNode(appNode);
          // TODO meeeh not .setScope here... REFACTOR, setScope should just set scope, not initialise graph
          currentView.applyFilters();
        }, function() {
          currentView.chooseNode(appNode);
        });
      } else {
        currentView.applyFilters();
      }
    }

    init(false);

    $scope.$on(Const.Events.INIT_MAIN, function() {
      if (inspectedApp.getKey() === lastAppKey) {
        init(true);
      } else {
        init(false);
      }
    });

    // TODO this seems architecturaly lame
    $scope.$on(Const.Events.UPDATE_GRAPH, function() {
      storage.saveCurrentView();
    });

    $scope.$on(Const.Events.CHOOSE_NODE, function() {
      storage.saveCurrentView();
    });

  });
