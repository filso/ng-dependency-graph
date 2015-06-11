'use strict';

angular.module('ngDependencyGraph')
  .factory('Module', function(Node) {

    function Module(_data) {
      Node.apply(this, arguments);
      this.initComponentsByType();
    }

    Module.prototype = Object.create(Node.prototype);

    Module.prototype.initComponentsByType = function() {
      var self = this;

      this.componentsByType = {};

      _.each(this._data.components, function(com) {
        if (self.componentsByType[com.type] === undefined) {
          self.componentsByType[com.type] = [];
        }

        self.componentsByType[com.type].push(com);

      });
    };

    // TODO: do I need this property?
    _.assign(Module.prototype, {
      isApp: _.property(this, '_isApp'),
    });

    return Module;

  });
