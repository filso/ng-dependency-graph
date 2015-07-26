'use strict';

/*jshint -W061 */
angular.module('ngDependencyGraph')
  .factory('inspectedApp', function($q, $timeout, appContext, chromeExtension, sampleAppData, Const) {

    var _data;
    var _versionCache = null;

    // TODO clear cache on page refresh
    // appContext.watchRefresh(function() {
    //   _data = undefined;
    // });

    var service = {
      getKey: function() {
        return this.getData().host + '__' + this.apps[0];
      },
      getAppsInfo: function() {
        var defer = $q.defer();

        chromeExtension.eval(function() {

          var appElms = document.querySelectorAll('[ng-app]');
          var appNames = [];
          angular.forEach(appElms, function(elm) {
            var appName = elm.getAttribute('ng-app');
            appNames.push(appName);
          });

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
      loadInspectedAppData: function(appName) {
        var defer = $q.defer();
        // TODO do sth smarter... maybe load sample app?
        if (!chromeExtension.isExtensionContext()) {
          defer.reject();
          return defer.promise;
        }

        var injectedFn = function(window, appName) {
          if (window.__ngDependencyGraph) {
            console.log('inside', appName);
            // console.log('meta', window.__ngDependencyGraph.getMetadata());
            return window.__ngDependencyGraph.getMetadata();
          }
        };

        function pollFn() {
          chromeExtension.eval(injectedFn, appName, function(data) {
            if (data === undefined || data.apps.length === 0) {
              $timeout(pollFn, Const.INJECTED_POLL_INTERVAL);
            } else {
              service._setData(data);
              defer.resolve(_data);
            }
          });

        }

        pollFn();

        return defer.promise;
      }
    };

    return service;
  });
