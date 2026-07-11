'use strict';

angular.module('ngDependencyGraph').factory('Module', function (Node) {
  class Module extends Node {
    constructor(data) {
      super(data);
      this.isModule = true;
    }
  }

  return Module;
});
