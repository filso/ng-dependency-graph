'use strict';

angular.module('ngDependencyGraph')
  .controller('OptionsCtrl', function($scope, currentView) {

    this.filterModules = currentView.filters.filterModules;
    this.ignoreModules = currentView.filters.ignoreModules;

    this.changeFilters = function(newValue) {
      currentView.setIgnoreModules(this.ignoreModules, this.filterModules);
    };
    

  });