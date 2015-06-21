'use strict';

angular.module('ngDependencyGraph')
  .factory('Module', function(Node) {

    function Module(_data) {
      Node.apply(this, arguments);
      this.isModule = true;
    }

    Module.prototype = Object.create(Node.prototype);

    return Module;

  });
