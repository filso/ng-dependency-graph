'use strict';

angular.module('ngDependencyGraph')
  .factory('Node', function() {

    function Node(_data) {
      this.name = _data.name;
      this._data = _data;
      this.deps = [];
      this.provides = [];
    }

    Object.defineProperty(Node.prototype, 'cssClass', {
      get: function() {
        return 'FIX THIS';
      }
    });

    _.assign(Node.prototype, {
      linkDep: function(node) {
        this.deps.push(node);
      },
      linkProvides: function(node) {
        this.provides.push(node);
      }
    });


    return Node;
  });
