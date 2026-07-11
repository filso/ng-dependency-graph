'use strict';

angular.module('ngDependencyGraph').factory('Node', function (util) {
  class Node {
    constructor(data) {
      this._id = util.uniqueId();
      this.name = data.name;
      this._data = data;
      this.type = data.type;
      this.deps = [];
      this.provides = [];
    }

    linkDep(node) {
      this.deps.push(node);
    }

    linkProvides(node) {
      this.provides.push(node);
    }

    resetLinks() {
      this.deps = [];
      this.provides = [];
    }
  }

  return Node;
});
