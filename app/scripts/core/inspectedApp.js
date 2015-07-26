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
      getAngularVersion: function() {
        var defer = $q.defer();
        if (_versionCache) {
          setTimeout(function() {
            defer.resolve(_versionCache);
          }, 0);
        } else {
          chromeExtension.eval(function() {
            return window.angular.version;
          }, function(data) {
            _versionCache = data;
            defer.resolve(_versionCache);
          });
        }
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
      loadInspectedAppData: function() {
        var defer = $q.defer();
        // TODO do sth smarter... maybe load sample app?
        if (!chromeExtension.isExtensionContext()) {
          defer.reject();
          return defer.promise;
        }

        var injectedFn = function(window) {
          if (window.__ngDependencyGraph) {
            // console.log('meta', window.__ngDependencyGraph.getMetadata());
            return window.__ngDependencyGraph.getMetadata();
          }
        };

        function pollFn() {
          chromeExtension.eval(injectedFn, function(data) {
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
