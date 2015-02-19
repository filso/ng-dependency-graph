angular.module('app')
  .factory('Controller', function(Component) {
    'use strict';
    
    function Controller() {
      Component.apply(this, arguments);
    }

    Controller.prototype = Object.create(Component.prototype);

    return Controller;
  });