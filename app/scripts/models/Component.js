angular.module('app')
  .factory('Component', function() {

    function Component(name) {
      this.name = name;
    }

    Component.prototype.toString = function() {

    };

    return Component;
  });