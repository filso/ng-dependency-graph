angular.module('ngArchitecture')
  .factory('Directive', function(Component) {
    'use strict';

    function Directive() {
      Component.apply(this, arguments);
    }
    Directive.prototype = Object.create(Component.prototype);

    return Directive;
  });