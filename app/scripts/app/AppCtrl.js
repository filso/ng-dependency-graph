'use strict';

// TODO refactor this mess ;)
angular.module('ngDependencyGraph')
  .controller('AppCtrl', function($scope, inspectedApp, storage, appContext) {
    var ctrl = this;

    var templates = {
      ABOUT: 'scripts/about/about.html',
      MAIN: 'scripts/main/main.html'
    };

    ctrl.appTemplate = templates.ABOUT;

    ctrl.loadSampleApp = function() {
      inspectedApp.loadSampleData();
      ctrl.appTemplate = templates.MAIN;
    };

    ctrl.insertCookieAndRefresh = function() {
      appContext.setDebug(true);
    };

    ctrl.loadInspectedApp = function() {
      // TODO in this place ADD COOKIE and RESTART... then getDebug again???
    };

    function init() {
      appContext.getDebug(function(enabled) {
        if (enabled) {
          // app enabled for this page
          inspectedApp.loadInspectedAppData(function() {
            ctrl.appTemplate = templates.MAIN;
            $scope.$apply();
          });
        } else {
          // cookie not set yet, check if Angular present
          inspectedApp.getAngularVersion(function(version) {
            ctrl.angularVersion = version.full;
            $scope.$apply();
          });
        }
      });
    }
    if (chrome.extension) {
      init();
    } else {
      // just load sample app, not in a tab, development / test
      ctrl.loadSampleApp();
    }

  });
