'use strict';

/*jshint -W061 */
angular.module('ngDependencyGraph')
  .factory('inspectedApp', function($q, $timeout, appContext, chromeExtension, sampleAppData, Const) {

    var _data;

    // TODO clear cache on page refresh
    // appContext.watchRefresh(function() {
    //   _data = undefined;
    // });

    var service = {
      waitingForAppData: false,
      getKey: function() {
        return this.getData().host + '__' + this.apps[0];
      },
      getAppsInfo: function() {
        var defer = $q.defer();

        chromeExtension.eval(function() {

          var appElms = document.querySelectorAll('[ng-app], [data-ng-app], [x-ng-app]');
          var appNames = [];
          for (var i = 0; i < appElms.length; ++i) {
            var elm = appElms[i];
            var appName = elm.getAttribute('ng-app') || elm.getAttribute('data-ng-app') || elm.getAttribute('x-ng-app');
            appNames.push(appName);
          }

          return {
            angularVersion: window.angular.version,
            appNames: appNames
          };

        }, function(data) {
          defer.resolve(data);
        });
        return defer.promise;
      },
      // TODO(filip): I don't like this interface... remove getData, pass inspected data instead?
      _setData: function(data) {
        _data = data;
        this.apps = _data.apps;
      },
      getData: function() {
        return _data;
      },
      loadSampleData: function() {
        this._setData(sampleAppData);
      },
      loadInspectedAppData: function(appNames) {
        var defer = $q.defer();
        // TODO do sth smarter... maybe load sample app?
        if (!chromeExtension.isExtensionContext()) {
          defer.reject();
          return defer.promise;
        }

        var injectedFn = function(window, appNames) {
          if (window.__ngDependencyGraph) {
            return window.__ngDependencyGraph.getMetadata(appNames);
          }
        };

        function pollFn() {
          chromeExtension.eval(injectedFn, appNames, function(data) {
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
      }
    };

    return service;
  });
