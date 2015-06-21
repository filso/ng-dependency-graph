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

    var serializedProps = ['filters', 'componentsVisible', 'scope'];

    var getKey = function() {
      return inspectedApp.getData().host + '__' + currentView.apps[0];
    };


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

        var key = getKey();
        var obj = _.pick(currentView, serializedProps);
        if (currentView.selectedNode) {
          obj.selectedNode = currentView.selectedNode.name;
        }
        window.ble2 = obj;

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
        var key = getKey();
        chromeSync.get(key, function(items) {
          var serialized = items[key];

          if (serialized) {
            var obj = angular.fromJson(serialized);
            // console.log(obj);

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
