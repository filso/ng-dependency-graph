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
  .factory('storage', function($q, $rootScope, currentView, inspectedApp) {

    var serializedProps = ['filters', 'options', 'scope'];


    // this has the same API as StorageArea chrome.sync
    var localStorageAdapter = {
      get: function(key, cb) {
        // Note: run cb outside AngularJS context to mimic chrome.sync behaviour
        setTimeout(function() {
          var items = {}; items[key] = localStorage.getItem(key);
          cb(items);
        });
      },
      set: function(obj, cb) {
        _.each(obj, function(val, key) {
          localStorage.setItem(key, val);
        });
        // Note: run cb outside AngularJS context to mimic chrome.sync behaviour
        setTimeout(cb);
      }
    };

    var chromeSync;
    if (!chrome.storage) {
      chromeSync = localStorageAdapter;
    } else {
      chromeSync = chrome.storage.sync;
    }

    var service = {

      saveCurrentView: function() {
        var defer = $q.defer();

        var key = inspectedApp.getKey();
        var obj = _.pick(currentView, serializedProps);
        if (currentView.selectedNode) {
          obj.selectedNode = currentView.selectedNode.name;
        }

        var data = angular.toJson(obj);
        var items = {}; items[key] = data;
        chromeSync.set(items, function() {
          defer.resolve();
          $rootScope.$apply();
        });

        return defer.promise;
      },

      loadCurrentView: function() {
        var defer = $q.defer();
        var key = inspectedApp.getKey();
        chromeSync.get(key, function(items) {
          var serialized = items[key];

          if (serialized) {
            var obj = angular.fromJson(serialized);

            _.each(serializedProps, function(key) {
              if (obj[key]) {
                currentView[key] = obj[key];
              }
            });
            defer.resolve();

            // TODO set previously selected node
          } else {
            defer.reject();
          }

          $rootScope.$apply();

        });
        return defer.promise;
      }

    };

    return service;
  });
