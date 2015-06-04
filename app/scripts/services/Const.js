'use strict';

angular.module('ngDependencyGraph')
  .value('Const', {
    ComponentType: {
      CONTROLLER: 'controller',
      DIRECTIVE: 'directive',
      SERVICE: 'service'
    }
  });