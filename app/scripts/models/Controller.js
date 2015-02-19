angular.module('app')
  .factory('Controller', function(Component) {
    function Controller() {
      Component.apply(this, arguments);
    }

    Controller.prototype = Object.create(Component.prototype);
    Controller.prototype.cssClass = 'controller';

    return Controller;
  });