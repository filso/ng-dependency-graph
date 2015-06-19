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

    var serializedProps = [''];

    var service = {

      saveCurrentView: function() {
        // chrome.storage.sync
        console.log(currentView);
        window.ble = currentView;
        window.ble2 = _.pick(currentView, serializedProps);
        // TODO pick these props, save to chrome.storage.sync
        // throw 'not implemented';
      },

      loadCurrentView: function() {
        // TODO
        // 
        // load saved props, just before loading Main
        throw 'not implemented';
      }

    };

    return service;
  });
