angular.module('app')
  .controller('MainCtrl', function($scope, dev, Component, Graph) {
    'use strict';

    // TODO(filip): move helper stuff to some reasonsable place, add flags (debugging)
    window.dev = dev;
    function clog(val) {
        var message = JSON.stringify(val).replace(/n/g, " ");
        chrome.tabs.sendRequest(tabId, 
            {"type": "consoleLog", "value": message}); 
    }


    var rawData = rawMockData.ngArchitecture;
    var rawNodes = rawData.modules[0].components;


    $scope.currentGraph = new Graph(rawNodes);


  });