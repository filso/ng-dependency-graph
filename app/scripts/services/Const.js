'use strict';

angular.module('ngDependencyGraph')
  .value('Const', {
    
    ComponentType: {
      CONTROLLER: 'controller',
      DIRECTIVE: 'directive',
      SERVICE: 'service'
    },

    View: {
      HOVER_TRANSITION_TIME: '500'
    }
    
  });