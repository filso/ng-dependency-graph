'use strict';

// abstraction layer for Chrome Extension APIs
angular.module('ngDependencyGraph').value('chromeExtension', {
  sendRequest: function(requestName, cb) {
    chrome.extension.sendRequest({
      script: requestName,
      tab: chrome.devtools.inspectedWindow.tabId
    }, cb || function() {});
  },

  /**
   * @btford:
   * written because I don't like the API for chrome.devtools.inspectedWindow.eval;
   * passing strings instead of functions are gross.
   */
  eval: function(fn, args, cb) {
    // with two args
    if (!cb && typeof args === 'function') {
      cb = args;
      args = {};
    } else if (!args) {
      args = {};
    }
    chrome.devtools.inspectedWindow.eval('(' +
      fn.toString() +
      '(window, ' +
      JSON.stringify(args) +
      '));', cb);
  }
});
