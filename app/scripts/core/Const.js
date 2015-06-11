'use strict';

angular.module('ngDependencyGraph')
  .value('Const', {
    AngularVersionRequired: '1.2.0',

    Events: {
      UPDATE_GRAPH: 'updateGraph',
      CHOOSE_NODE: 'chooseNode'
    },
    
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