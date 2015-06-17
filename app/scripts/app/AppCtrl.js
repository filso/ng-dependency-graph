'use strict';

angular.module('ngDependencyGraph')
  .controller('AppCtrl', function($scope, inspectedApp, storage) {
    var ctrl = this;

    ctrl.appTemplate = 'scripts/about/about.html';

    function loadSampleApp() {
      inspectedApp.loadSampleData();
      ctrl.appTemplate = 'scripts/main/main.html';
    }

    if (chrome.extension) {
      inspectedApp.getAngularVersion(function(version) {
        ctrl.angularVersion = version;
        if (version === undefined) {

        } else {
        }
      });
    } else {
      console.log('not in a tab');
      loadSampleApp();
      // just load sample app, not in a tab
    }


    // inspectedApp.loadData(function(deps) {
    //   if (deps) {
    //     // AngularJS app detected, check if user already opened graph on this page
    //     ctrl.angularAppDetected = true;
    //     ctrl.appTemplate = 'scripts/about/about.html';
    //   } else {
    //     ctrl.angularAppDetected = false;
    //   }
    // });

  });
