'use strict';

angular.module('ngDependencyGraph')
  .factory('inspectedApp', function(appContext, chromeExtension) {

    var _data;
    var _versionCache = null;

    // clear cache on page refresh
    // appContext.watchRefresh(function() {
    //   _versionCache = null;
    //   _data = undefined;
    // });


    var service = {
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
      getData: function() {
        return _data;
      },
      loadSampleData: function() {
        _data = sampleAppData.ngArchitecture;
      },
      loadData: function(callback) {
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
            if (data) {
              _data = data;
            }
            callback(_data);
          });
      }
    };

    return service;
  });