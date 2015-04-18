// Service for retrieving and caching application dependencies
angular.module('ngArchitecture')
  .factory('appDeps', function(appContext, chromeExtension) {

    var _depsCache = [];

    // // clear cache on page refresh
    // appContext.watchRefresh(function() {
    //   _depsCache = [];
    // });

    return {
      get: function(callback) {
        chromeExtension.eval(function(window) {
            if (window.__ngArchitecture) {
              return '';
              return window.__ngArchitecture.getDeps();
            }
          },
          function(data) {
            if (data) {
              _depsCache = data;
            }
            callback(_depsCache);
          });
      }
    };
  });