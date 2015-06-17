'use strict';

angular.module('ngDependencyGraph')
  .controller('AppCtrl', function($scope) {
    var ctrl = this;

    ctrl.appTemplate = 'scripts/about/about.html';

    ctrl.angularAppDetected = false;

  });
