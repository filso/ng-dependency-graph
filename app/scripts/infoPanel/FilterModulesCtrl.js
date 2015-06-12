'use strict';

angular.module('ngDependencyGraph')
  .controller('FilterModulesCtrl', function($scope, currentView) {

    this.filterModules = currentView.filters.filterModules;
    this.ignoreModules = currentView.filters.ignoreModules;

    this.change = function(newValue) {
      console.log(newValue);
      currentView.setIgnoreModules(this.ignoreModules, this.filterModules);
    };
    

  });