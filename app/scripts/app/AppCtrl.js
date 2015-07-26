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

    ctrl.insertCookieAndRefresh = function(val) {
      appContext.setDebug(val);
    };

    function init() {
      appContext.getDebug(function(enabled) {
        if (enabled) {
          // App enabled for this page.
          inspectedApp.loadInspectedAppData().then(function() {
            if (ctrl.appTemplate !== templates.MAIN) {
              ctrl.appTemplate = templates.MAIN;
            } else {
              console.log(inspectedApp.getData());
              $scope.$broadcast(Const.Events.INIT_MAIN);
            }
          });
        } else {
          // Cookie not set yet, so check if Angular is present.
          inspectedApp.getAngularVersion().then(function(version) {
            ctrl.angularVersion = version && version.full;
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
