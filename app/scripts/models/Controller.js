angular.module('app')
  .factory('Controller', function(Component) {
    var Controller = Object.create(Component.prototype);

    


    return Controller;
  });