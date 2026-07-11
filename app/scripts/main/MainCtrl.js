'use strict';

angular
  .module('ngDependencyGraph')
  .controller('MainCtrl', function ($scope, Graph, Const, currentView, inspectedApp, storage, tour) {
    const ctrl = this;
    let lastAppKey;
    let componentsGraph;
    let modulesGraph;

    $scope.currentView = currentView;

    ctrl.startTour = function () {
      tour.start();
    };

    ctrl.isTourActive = function () {
      return Shepherd.activeTour !== null && Shepherd.activeTour !== undefined;
    };

    storage.getTourDone().then(function (done) {
      if (!done) {
        ctrl.startTour();
      }
    });

    function init(isTheSameApp) {
      lastAppKey = inspectedApp.getKey();
      const rawData = inspectedApp.getData();

      rawData.modules.forEach((module) => {
        module.type = 'module';
        module.components.forEach((com) => {
          com._module = module;
        });
      });

      const allComponents = rawData.modules.flatMap((module) => module.components);

      // If it's the same app, reuse nodes of the old graph so D3 keeps positions
      componentsGraph = Graph.createFromRawNodes(
        allComponents,
        Const.Scope.COMPONENTS,
        isTheSameApp ? componentsGraph : undefined,
      );
      modulesGraph = Graph.createFromRawNodes(
        rawData.modules,
        Const.Scope.MODULES,
        isTheSameApp ? modulesGraph : undefined,
      );

      // Connect modules with components
      componentsGraph.nodes.forEach((com) => {
        const module = modulesGraph.nodes.find((m) => m.name === com._data._module.name);
        com.module = module;

        module.componentsByType = module.componentsByType || {};
        module.componentsByType[com.type] = module.componentsByType[com.type] || [];
        module.componentsByType[com.type].push(com);
      });

      currentView.setGraphs(modulesGraph, componentsGraph);

      const appNode = modulesGraph.nodes.find((m) => m.name === rawData.apps[0]);

      if (isTheSameApp) {
        currentView.applyFilters();
      } else {
        const showApp = function () {
          currentView.chooseNode(appNode);
          currentView.scope = Const.Scope.COMPONENTS;
          currentView.applyFilters();
        };
        storage.loadCurrentView().then(showApp, showApp);
      }
    }

    init(false);

    $scope.$on(Const.Events.INIT_MAIN, function () {
      init(inspectedApp.getKey() === lastAppKey);
    });

    $scope.$on(Const.Events.UPDATE_GRAPH, storage.saveCurrentView);
    $scope.$on(Const.Events.CHOOSE_NODE, storage.saveCurrentView);
  });
