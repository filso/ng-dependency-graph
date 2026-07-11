'use strict';

// Service for running code in the context of the inspected page.
angular.module('ngDependencyGraph').factory('appContext', function (chromeExtension, Const) {
  return {
    /**
     * Sets the opt-in cookie and reloads the page so the content script
     * instruments the app. Pass '' to delete the cookie (disables the graph).
     */
    setCookie(appName) {
      chromeExtension.eval(
        function (window, args) {
          if (args.value === '') {
            document.cookie = args.cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          } else {
            document.cookie = args.cookieName + '=' + encodeURIComponent(args.value) + ';';
          }
          window.location.reload();
        },
        { value: appName, cookieName: Const.COOKIE_NAME },
      );
    },

    getCookie(cb) {
      chromeExtension.eval(
        function (window, args) {
          var match = document.cookie.match(new RegExp('(?:^|;\\s*)' + args.cookieName + '=([^;]*)'));
          return match ? decodeURIComponent(match[1]) || null : null;
        },
        { cookieName: Const.COOKIE_NAME },
        cb,
      );
    },

    // Invokes cb whenever the inspected tab finishes loading.
    watchRefresh(cb) {
      const port = chrome.runtime.connect();
      port.postMessage({
        action: 'register',
        inspectedTabId: chrome.devtools.inspectedWindow.tabId,
      });
      port.onMessage.addListener(function (msg) {
        if (msg.action === 'refresh' && msg.changeInfo.status === 'complete') {
          cb(msg.changeInfo);
        }
      });
    },
  };
});
