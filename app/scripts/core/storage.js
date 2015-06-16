'use strict';

/**
 * Responsibilities:
 * - saving / loading currentView with serialisation
 */
angular.module('ngDependencyGraph')
  .factory('storage', function(currentView) {
    var service = {

      saveCurrentView: function() {
        // chrome.storage.sync
        // TODO
        throw 'not implemented';
      },

      loadCurrentView: function() {
        // TODO
        throw 'not implemented';
      }

    };

    return service;
  });
