'use strict';

angular.module('ngDependencyGraph')
  .factory('appDeps', function(appContext, chromeExtension) {

    var _depsCache;

    // // clear cache on page refresh
    // if (chrome.extension) { // TODO ... this isn't necessary in tab context, chrome.extension should be always defined
    //                         // maybe abstract this in appContext?
    //   appContext.watchRefresh(function() {
    //     _depsCache = [];
    //   });
    // }

    return {
      loadFromInspectedWindow: function(callback) {
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
              _depsCache = data;
            }
            callback(_depsCache);
          });
      }
    };
  });