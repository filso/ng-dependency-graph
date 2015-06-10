'use strict';

angular.module('ngDependencyGraph')
  .controller('InfoPanelCtrl', function($scope, currentView) {
    var self = this;

    $scope.$on('chooseNode', function() {
      self.node = currentView.node;
    });

    $scope.chooseNode = function(node) {
      currentView.chooseNode(node);
    };

  });
