'use strict';

angular.module('ngDependencyGraph')
  .controller('MainCtrl', function($scope, dev, Graph, Const, currentView) {

    window.dev = dev;

    $scope.currentView = currentView;

    var rawData = rawMockData.ngArchitecture;
    console.log(rawData);
    var rawNodes = rawData.modules[0].components;
    rawNodes = rawData.modules;


    $scope.currentGraph = new Graph(rawNodes);

    currentView.scope = 'components';

    $scope.chooseScope = function(val) {

        $scope.scope = val;

        if (val === Const.Scope.MODULES) {

        } else {

        }

    };

  });