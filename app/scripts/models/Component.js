'use strict';

angular.module('ngDependencyGraph')
  .factory('Component', function(Node) {

    function Component(_data) {

      this.type = _data.type;
      this.name = _data.name;
      this._data = _data;
      this.deps = [];
      this.provides = [];

      Node.apply(this, arguments);
    }

    Component.prototype = Object.create(Node.prototype);

    return Component;
  });