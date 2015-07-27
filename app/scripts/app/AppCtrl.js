'use strict';

// TODO(filip): refactor this mess ;)
angular.module('ngDependencyGraph')
  .controller('AppCtrl', function($rootScope, $scope, inspectedApp, Const, storage, appContext, currentView) {
    var _this = this;

    var templates = {
      ABOUT: 'scripts/about/about.html',
      MAIN: 'scripts/main/main.html'
    };

    _this.appTemplate = templates.LOADING;

    _this.loadSampleApp = function() {
      inspectedApp.loadSampleData();
      _this.appTemplate = templates.MAIN;
    };

    _this.insertCookieAndRefresh = function(appName) {
      appContext.setCookie(appName);
    };

    _this.inspectedApp = inspectedApp;

    function init() {
      inspectedApp.waitingForAppData = false;

      appContext.getCookie(function(appName) {
        if (appName !== null && appName !== 'true') {
          // App enabled for this page.
          _this.appTemplate = templates.ABOUT;
          _this.appName = appName;
          inspectedApp.loadInspectedAppData([appName]).then(function() {
            if (_this.appTemplate !== templates.MAIN) {
              _this.appTemplate = templates.MAIN;
            } else {
              console.log(inspectedApp.getData());
              $scope.$broadcast(Const.Events.INIT_MAIN);
            }
          });
        } else {
          // Cookie not set yet, so check if Angular is present.
          inspectedApp.getAppsInfo().then(function(data) {
            _this.appsInfo = data;
            _this.appTemplate = templates.ABOUT;
          });
        }
      });
    }

    if (chrome.extension) {
      appContext.watchRefresh(init);
      init();
    } else {
      // just load sample app, not in a tab, development / test
      _this.loadSampleApp();
      $scope.$broadcast('initMain');
    }

  });
