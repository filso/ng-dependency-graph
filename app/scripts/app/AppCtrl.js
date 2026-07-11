'use strict';

angular.module('ngDependencyGraph').controller('AppCtrl', function ($scope, inspectedApp, Const, appContext) {
  const ctrl = this;

  const templates = {
    ABOUT: 'scripts/about/about.html',
    MAIN: 'scripts/main/main.html',
  };

  ctrl.loadSampleApp = function () {
    inspectedApp.loadSampleData();
    ctrl.appTemplate = templates.MAIN;
  };

  ctrl.insertCookieAndRefresh = function (appName) {
    appContext.setCookie(appName);
  };

  ctrl.inspectedApp = inspectedApp;

  function init() {
    inspectedApp.waitingForAppData = false;

    appContext.getCookie(function (appName) {
      if (appName !== null && appName !== 'true') {
        // Graph enabled for this page
        ctrl.appName = appName;
        inspectedApp.loadInspectedAppData([appName]).then(function () {
          if (ctrl.appTemplate !== templates.MAIN) {
            ctrl.appTemplate = templates.MAIN;
          } else {
            $scope.$broadcast(Const.Events.INIT_MAIN);
          }
        });
      } else {
        // Cookie not set yet — check if AngularJS is present on the page
        inspectedApp.getAppsInfo().then(function (data) {
          ctrl.appsInfo = data;
          ctrl.appTemplate = templates.ABOUT;
        });
      }
    });
  }

  if (window.chrome && window.chrome.runtime) {
    appContext.watchRefresh(init);
    init();
  } else {
    // Not running as an extension: development / demo mode
    ctrl.loadSampleApp();
    $scope.$broadcast(Const.Events.INIT_MAIN);
  }
});
