'use strict';

angular.module('ngDependencyGraph')
  .factory('Node', function() {

    function Node(_data) {
      this._id = _.uniqueId();
      this.name = _data.name;
      this._data = _data;
      this.type = _data.type;
      this.deps = [];
      this.provides = [];
    }

    _.assign(Node.prototype, {
      linkDep: function(node) {
        this.deps.push(node);
      },
      linkProvides: function(node) {
        this.provides.push(node);
      },
      resetLinks: function() {
        this.deps = [];
        this.provides = [];
      }
    });


    return Node;
  });
