'use strict';

angular.module('ngDependencyGraph')
  .factory('Module', function(Node) {

    function Module(_data) {
      Node.apply(this, arguments);
      this.isModule = true;
    }

    Module.prototype = Object.create(Node.prototype);


    // TODO: do I need this property?
    _.assign(Module.prototype, {
      isApp: _.property(this, '_isApp'),
    });

    return Module;

  });
