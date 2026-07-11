'use strict';

// Fetches dependency metadata from the inspected page (or sample data in dev).
angular
  .module('ngDependencyGraph')
  .factory('inspectedApp', function ($q, $timeout, chromeExtension, sampleAppData, Const) {
    let _data;

    const service = {
      waitingForAppData: false,

      getKey() {
        return this.getData().host + '__' + this.apps[0];
      },

      // Detects AngularJS and ng-app declarations on the inspected page.
      getAppsInfo() {
        const defer = $q.defer();

        chromeExtension.eval(
          function (window) {
            var appElms = document.querySelectorAll('[ng-app], [data-ng-app], [x-ng-app]');
            var appNames = [];
            for (var i = 0; i < appElms.length; ++i) {
              var elm = appElms[i];
              appNames.push(
                elm.getAttribute('ng-app') || elm.getAttribute('data-ng-app') || elm.getAttribute('x-ng-app'),
              );
            }

            return {
              angularVersion: window.angular && window.angular.version,
              appNames: appNames,
            };
          },
          function (data) {
            defer.resolve(data);
          },
        );

        return defer.promise;
      },

      _setData(data) {
        _data = data;
        this.apps = _data.apps;
      },

      getData() {
        return _data;
      },

      loadSampleData() {
        this._setData(sampleAppData);
      },

      /**
       * Polls the instrumented page until dependency metadata is available.
       */
      loadInspectedAppData(appNames) {
        const defer = $q.defer();

        if (!chromeExtension.isExtensionContext()) {
          defer.reject();
          return defer.promise;
        }

        const injectedFn = function (window, appNames) {
          if (window.__ngDependencyGraph) {
            return window.__ngDependencyGraph.getMetadata(appNames);
          }
        };

        function pollFn() {
          chromeExtension.eval(injectedFn, appNames, function (data) {
            if ((data === undefined || data.apps.length === 0) && service.waitingForAppData === true) {
              $timeout(pollFn, Const.INJECTED_POLL_INTERVAL);
            } else {
              service._setData(data);
              service.waitingForAppData = false;
              defer.resolve(_data);
            }
          });
        }

        service.waitingForAppData = true;
        pollFn();

        return defer.promise;
      },
    };

    return service;
  });
