'use strict';

// TODO(filip): refactor this mess ;)
angular.module('ngDependencyGraph')
  .controller('AppCtrl', function($rootScope, $scope, inspectedApp, Const, storage, appContext, currentView) {
    var ctrl = this;

    var templates = {
      ABOUT: 'scripts/about/about.html',
      MAIN: 'scripts/main/main.html',
      LOADING: 'scripts/about/loading.html'
    };

    ctrl.appTemplate = templates.LOADING;

    ctrl.loadSampleApp = function() {
      inspectedApp.loadSampleData();
      ctrl.appTemplate = templates.MAIN;
    };

    ctrl.insertCookieAndRefresh = function(appName) {
      appContext.setDebug(appName);
    };

    function init() {
      appContext.getDebug(function(appName) {
        if (appName !== undefined) {
          // App enabled for this page.
          inspectedApp.loadInspectedAppData(appName).then(function() {
            if (ctrl.appTemplate !== templates.MAIN) {
              ctrl.appTemplate = templates.MAIN;
            } else {
              console.log(inspectedApp.getData());
              $scope.$broadcast(Const.Events.INIT_MAIN);
            }
          });
        } else {
          // Cookie not set yet, so check if Angular is present.
          inspectedApp.getAppsInfo().then(function(data) {
            ctrl.angularVersion = data.angularVersion.full;
            ctrl.appName = data.appNames[0];
            console.log(data);
            ctrl.appTemplate = templates.ABOUT;
            $scope.$apply();
          });
        }
      });
    }

    if (chrome.extension) {
      appContext.watchRefresh(init);
      init();
    } else {
      // just load sample app, not in a tab, development / test
      ctrl.loadSampleApp();
      $scope.$broadcast('initMain');
    }

  });
