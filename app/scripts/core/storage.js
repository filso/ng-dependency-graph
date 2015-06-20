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

    var serializedProps = ['filters', 'componentsVisible'];

    var getKey = function() {
      return inspectedApp.getData().host + '__' + currentView.apps[0];
    };


    // this has the same API as StorageArea chrome.sync
    var localStorageAdapter = {
      get: function(key, cb) {
        cb(localStorage.getItem(key));
      },
      set: function(obj, cb) {
        _.each(obj, function(key, val) {
          console.log('setkey', key, val);
        });
      }
    };

    var chromeSync;

    if (!chrome.storage) {
      chromeSync = localStorageAdapter;
      console.log('no storage');
    } else {
      chromeSync = chrome.storage.sync;
    }

    var service = {

      saveCurrentView: function() {
        var defer = $q.defer();

        var key = getKey();

        console.log('key', key);
    
        window.ble = currentView;
        var obj = _.pick(currentView, serializedProps);
        obj.selectedNode = currentView.selectedNode.name;
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
        chromeSync.get(key, function(serialized) {
          if (serialized) {
            var obj = angular.fromJson(serialized);

            _.each(serializedProps, function(key) {
              currentView[key] = obj[key];
            });
          }

          defer.resolve();
          $rootScope.$apply();

        });
        return defer.promise;
      }

    };

    return service;
  });
