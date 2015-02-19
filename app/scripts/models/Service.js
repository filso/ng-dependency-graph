angular.module('app')
  .factory('Service', function(Component) {
    function Service() { }
    
    Service.prototype = Object.create(Component.prototype);

    Service.prototype.cssClass = 'controller';

    return Service;
  });