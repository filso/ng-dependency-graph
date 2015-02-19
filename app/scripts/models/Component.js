angular.module('app')
  .factory('Component', function(Node) {
    'use strict';

    function Component(_data) {
      this.name = _data.name;
      this._data = _data;
      this.deps = [];
      this.provides = [];
    }

    Component.prototype = Object.create(Node.prototype);

    _.assign(Component.prototype, {
      linkDep: function(node) {
        this.deps.push(node);
      },
      linkProvides: function(node) {
        this.provides.push(node);
      }
    });


    return Component;
  });