angular.module('ngArchitecture')
  .factory('Service', function(Component) {
    'use strict';
    
    function Service() {
      Component.apply(this, arguments);
    }

    Service.prototype = Object.create(Component.prototype);

    return Service;
  });