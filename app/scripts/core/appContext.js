'use strict';

/*jshint -W061 */
// Service for running code in the context of the application being debugged
angular.module('ngDependencyGraph')
  .factory('appContext', function(chromeExtension, Const) {

    // Public API
    // ==========
    return {
      refresh: function(cb) {
        chromeExtension.eval(function(window) {
          window.document.location.reload();
        }, cb);
      },
      /**
       * Takes app name. If '', deletes the cookie
       */
      setCookie: function(appName) {
        chromeExtension.eval(function(window, args) {
          if (args.value === '') {
            document.cookie = '__ngDependencyGraph=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          } else {
            document.cookie = '__ngDependencyGraph=' + encodeURIComponent(args.value) + ';';
          }
          window.location = window.location;
        }, {value: appName});
      },
      getCookie: function(cb) {
        chromeExtension.eval(function(window) {
          var sKey = '__ngDependencyGraph';
          return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        }, cb);
      },

      // takes a bool
      setLog: function(setting) {
        setting = !!setting;
        chromeExtension.eval('function (window) {' +
          'window.__ngDependencyGraph.log = ' + setting.toString() + ';' +
          '}');
      },

      // Registering events
      // ------------------

      // TODO: depreciate this; only poll from now on?
      // There are some cases where you need to gather data on a once-per-bootstrap basis, for
      // instance getting the version of AngularJS

      // TODO: move to chromeExtension?
      watchRefresh: function(cb) {
        var port = chrome.extension.connect();
        port.postMessage({
          action: 'register',
          inspectedTabId: chrome.devtools.inspectedWindow.tabId
        });
        port.onMessage.addListener(function(msg) {
          if (msg.action === 'refresh' && msg.changeInfo.status === 'complete') {
            cb(msg.changeInfo);
          }
        });
        port.onDisconnect.addListener(function(a) {
          console.log(a);
        });
      }

    };
  });
