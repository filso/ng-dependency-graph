'use strict';

angular.module('ngDependencyGraph')
  .factory('inspectedApp', function(appContext, chromeExtension, sampleAppData) {

    var _data;
    var _versionCache = null;

    // clear cache on page refresh
    // appContext.watchRefresh(function() {
    //   _versionCache = null;
    //   _data = undefined;
    // });

    var service = {
      getKey: function() {
        return this.getData().host + '__' + this.apps[0];
      },
      getAngularVersion: function(callback) {
        if (_versionCache) {
          setTimeout(function() {
            callback(_versionCache);
          }, 0);
        } else {
          chromeExtension.eval(function() {
            return window.angular.version;
          }, function(data) {
            _versionCache = data;
            callback(_versionCache);
          });
        }
      },
      // TODO(filip): I don't like this interface
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
      loadInspectedAppData: function(callback) {
        // TODO add polling here
        if (!chrome.extension) { // TODO do sth smarter... maybe load sample app?
          callback(false);
          return;
        }
        chromeExtension.eval(function(window) {
            if (window.__ngDependencyGraph) {
              // console.log('meta', window.__ngDependencyGraph.getMetadata());
              return window.__ngDependencyGraph.getMetadata();
            }
          },
          function(data) {
            this._setData(data);
            callback(_data);
          });
      }
    };

    return service;
  });