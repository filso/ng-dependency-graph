'use strict';

// Service for running code in the context of the application being debugged
angular.module('ngDependencyGraph')
  .factory('appInfo', function(chromeExtension, appContext) {

    var _versionCache = null,
      _srcCache = null;

    // clear cache on page refresh
    appContext.watchRefresh(function() {
      _versionCache = null;
      _srcCache = null;
    });

    return {
      getAngularVersion: function(callback) {
        if (_versionCache) {
          setTimeout(function() {
            callback(_versionCache);
          }, 0);
        } else {
          chromeExtension.eval(function() {
            return window.angular.version.full +
              ' ' +
              window.angular.version.codeName;
          }, function(data) {
            _versionCache = data;
            callback(_versionCache);
          });
        }
      }
    };
  });
