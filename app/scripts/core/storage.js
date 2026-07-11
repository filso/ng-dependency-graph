'use strict';

/**
 * Persists the current view (scope, filters, options) per inspected app,
 * using chrome.storage.sync — or localStorage outside the extension.
 */
angular.module('ngDependencyGraph').factory('storage', function ($q, $rootScope, currentView, inspectedApp, Const) {
  const serializedProps = ['filters', 'options', 'scope'];

  // Same API as chrome.storage.sync, for development outside the extension.
  const localStorageAdapter = {
    get(key, cb) {
      // Run cb outside AngularJS context to mimic chrome.storage behaviour
      setTimeout(() => cb({ [key]: localStorage.getItem(key) }));
    },
    set(obj, cb) {
      Object.entries(obj).forEach(([key, val]) => localStorage.setItem(key, val));
      setTimeout(cb);
    },
  };

  const backend = window.chrome && window.chrome.storage ? window.chrome.storage.sync : localStorageAdapter;

  const singleValueAccessor = {
    get(key) {
      const defer = $q.defer();
      backend.get(key, (items) => {
        defer.resolve(items[key]);
        $rootScope.$apply();
      });
      return defer.promise;
    },
    set(key, val) {
      const defer = $q.defer();
      backend.set({ [key]: val }, () => {
        defer.resolve();
        $rootScope.$apply();
      });
      return defer.promise;
    },
  };

  return {
    saveTourDone() {
      singleValueAccessor.set(Const.TOUR_KEY, true);
    },

    getTourDone() {
      return singleValueAccessor.get(Const.TOUR_KEY);
    },

    saveCurrentView() {
      const defer = $q.defer();

      const key = inspectedApp.getKey();
      const obj = {};
      serializedProps.forEach((prop) => {
        obj[prop] = currentView[prop];
      });
      if (currentView.selectedNode) {
        obj.selectedNode = currentView.selectedNode.name;
      }

      backend.set({ [key]: angular.toJson(obj) }, () => {
        defer.resolve();
        $rootScope.$apply();
      });

      return defer.promise;
    },

    loadCurrentView() {
      const defer = $q.defer();
      const key = inspectedApp.getKey();
      let dataLoaded = false;

      backend.get(key, (items) => {
        dataLoaded = true;
        const serialized = items[key];

        if (serialized) {
          const obj = angular.fromJson(serialized);
          serializedProps.forEach((prop) => {
            if (obj[prop]) {
              currentView[prop] = obj[prop];
            }
          });
          defer.resolve();
        } else {
          defer.reject();
        }

        $rootScope.$apply();
      });

      setTimeout(() => {
        // HACK: chrome.storage.sync sometimes never invokes the callback when
        // the inspector is docked horizontally — reject after a timeout.
        if (dataLoaded === false) {
          defer.reject();
          $rootScope.$apply();
        }
      }, 300);

      return defer.promise;
    },
  };
});
