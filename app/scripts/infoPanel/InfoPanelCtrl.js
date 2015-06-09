'use strict';

angular.module('ngDependencyGraph')
  .controller('InfoPanelCtrl', function($scope, currentView) {
    var ctrl = this;

    this.ha = 'bleblbeble';

    $scope.$on('chooseNode', function() {
      console.log('asd!');
      console.log(currentView.node);
      ctrl.node = currentView.node;
    });

  });
