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
  .factory('storage', function($q, $rootScope, currentView, inspectedApp, Const) {

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

    var singleValueAccessor = {
      get: function(key) {
        var defer = $q.defer();
        chromeSync.get(key, function(items) {
          defer.resolve(items[key]);
          $rootScope.$apply();
        })
        return defer.promise;
      },
      set: function(key, val) {
        var defer = $q.defer();
        var items = {}; items[key] = val;
        chromeSync.set(items, function() {
          defer.resolve();
          $rootScope.$apply();
        });
        return defer.promise;
      }
    };

    var service = {

      saveTourDone: function() {
        singleValueAccessor.set(Const.TOUR_KEY, true);
      },

      getTourDone: function() {
        return singleValueAccessor.get(Const.TOUR_KEY);
      },

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
        var dataLoaded = false;

        chromeSync.get(key, function(items) {
          dataLoaded = true;
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

        setTimeout(function() {
          // HACK: chrome.sync for whatever reasons sometimes doesn't invoke the callback when inspector tab is horizontal
          // Make sure that promise is rejected when this happens - wait 200 msec.
          if (dataLoaded === false) {
            console.log('Warning! syncing data doesn\'t seem to work!');
            defer.reject();
            $rootScope.$apply();
          }
        }, 300);

        return defer.promise;
      }

    };

    return service;
  });
