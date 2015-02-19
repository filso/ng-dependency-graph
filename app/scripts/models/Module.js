angular.module('app')
  .factory('Module', function() {

    function Module(name) {
      this.name = name;
    }

    Module.prototype = Object.create(Node);

    _.assign(Module.prototype, {
      isApp: _.property(this, '_isApp'),
    });

  });
