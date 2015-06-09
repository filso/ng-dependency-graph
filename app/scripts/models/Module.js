'use strict';

angular.module('ngDependencyGraph')
  .factory('Module', function(Node) {

    function Module(_data) {
      Node.apply(this, arguments);
    }

    Module.prototype = Object.create(Node.prototype);

    _.assign(Module.prototype, {
      isApp: _.property(this, '_isApp'),
    });

    return Module;

  });
