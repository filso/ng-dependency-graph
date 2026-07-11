'use strict';

angular.module('ngDependencyGraph').factory('Component', function (Node) {
  class Component extends Node {
    constructor(data) {
      super(data);
      this.isModule = false;
    }
  }

  return Component;
});
