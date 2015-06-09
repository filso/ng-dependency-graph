'use strict';

angular.module('ngDependencyGraph')
  .factory('currentView', function($rootScope) {

    return {
      node: null,
      chooseNode: function(node) {
        this.node = node;
        console.log('bla!');
        $rootScope.$broadcast('chooseNode');
      }
    };

  });
