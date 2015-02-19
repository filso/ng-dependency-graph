angular.module('app')
  .controller('MainCtrl', function($scope, dev, Component, Graph) {
    'use strict';

    function clog(val) {
        var message = JSON.stringify(val).replace(/n/g, " ");
        chrome.tabs.sendRequest(tabId, 
            {"type": "consoleLog", "value": message}); 
    }

    var rawData = rawMockData.ngArchitecture;
    var rawNodes = rawData.modules[0].components;
    var nodes = Component.createComponents(rawNodes);


    window.dev = dev;

    var links = [];

    _.each(nodes, function(node1) {

      _.each(node1.deps, function(node2) {
        links.push({source: node1, target: node2})
      });

    });

    $scope.currentGraph = new Graph(links, nodes);


  });