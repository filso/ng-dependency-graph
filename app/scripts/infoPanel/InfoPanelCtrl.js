'use strict';

angular.module('ngDependencyGraph')
  .controller('InfoPanelCtrl', function($scope, currentView, Const) {
    var self = this;

    $scope.$on(Const.Events.CHOOSE_NODE, function() {
      self.node = currentView.selectedNode;
    });

    $scope.chooseNode = function(node) {
      currentView.chooseNode(node);
    };


  });
