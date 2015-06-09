'use strict';

angular.module('ngDependencyGraph')
  .factory('Component', function(Node) {

    function Component(_data) {
      this.module = _data._module;
      Node.apply(this, arguments);
    }

    Component.prototype = Object.create(Node.prototype);

    return Component;
  });