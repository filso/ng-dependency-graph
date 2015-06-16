'use strict';

/**
 * Responsibilities:
 * - saving / loading currentView with serialisation
 *
 * Persist per project:
 * - module / component switch
 * - focused node
 * - ignore + filter modules fields (filters)
 * - component types visibility (filters)
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
