'use strict';

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
      // takes a bool
      setDebug: function(setting) {
        if (setting === true) {
          chromeExtension.eval(function(window) {
            window.document.cookie = '__ngDependencyGraph=true;';
            window.document.location.reload();
          });
        } else {
          chromeExtension.eval(function(window) {
            window.document.cookie = '__ngDependencyGraph=false;';
            window.document.location.reload();
          });
        }
      },
      getDebug: function(cb) {
        chromeExtension.eval(function(window) {
          return document.cookie.indexOf('__ngDependencyGraph=true') !== -1;
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
          if (msg === 'refresh') {
            cb();
          }
        });
        port.onDisconnect.addListener(function(a) {
          console.log(a);
        });
      }

    };
  });
