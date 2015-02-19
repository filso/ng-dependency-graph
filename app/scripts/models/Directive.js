angular.module('app')
  .factory('Directive', function(Component) {
    function Directive() {}
    Directive.prototype = Object.create(Component.prototype);

    Directive.prototype.cssClass = 'controller';

    return Directive;
  });