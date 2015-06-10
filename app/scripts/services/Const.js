'use strict';

angular.module('ngDependencyGraph')
  .value('Const', {
    
    ComponentType: {
      CONTROLLER: 'controller',
      DIRECTIVE: 'directive',
      SERVICE: 'service',
      FILTER: 'filter'
    },

    Scope: {
      COMPONENTS: 'components',
      MODULES: 'modules'
    },

    View: {
      HOVER_TRANSITION_TIME: '500'
    }
    
  });